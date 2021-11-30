import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";

import { BigNumber } from "ethers";
import { ExecutionResponse, IAdapter } from "../../Types";

import { GenericUseCase } from "../../Entities";
import { MulticallBaseAdapter } from "./MulticallBaseAdapter";
import { successResponse } from "../Helpers";

type GroupedUseCases = {
  contractAddress: string;
  useCases: Array<{ order: number; useCase: GenericUseCase }>;
};
type OrderedContractUseCaseMap = Record<string, GroupedUseCases>;

export class Web3MulticallAdapter extends MulticallBaseAdapter {
  protected multicall?: Multicall;
  constructor(adapter: IAdapter) {
    super(adapter);

    if (this.isMulticallSupported) {
      const tryAggregate =
        this.adapter.blockchainConfig.multicall?.tryAggregate;
      this.multicall = new Multicall({
        multicallCustomContractAddress:
          this.adapter.blockchainConfig.multicall?.address,
        ethersProvider: this.adapter.getProvider(),
        tryAggregate: typeof tryAggregate === "undefined" ? true : tryAggregate,
      });
    }
  }

  execute(useCases: GenericUseCase[]): Promise<ExecutionResponse[]> {
    if (!this.isMulticallSupported) {
      return super.execute(useCases);
    }
    const callContexts: ContractCallContext[] = Object.values(
      useCases.reduce(this.groupUseCasesByContractKeepingOrder.bind(this), {})
    ).map(this.mapGroupedUseCasesToMulticallCtx.bind(this));

    return this.multicall
      .call(callContexts)
      .then(this.processMulticallResult.bind(this));
  }

  private mapGroupedUseCasesToMulticallCtx(
    group: GroupedUseCases
  ): ContractCallContext {
    return {
      reference: group.contractAddress,
      contractAddress: group.contractAddress,
      abi: this.adapter.getContractInterface(group.contractAddress),
      calls: group.useCases.map((useCase) => ({
        reference: `${useCase.order}`,
        methodName: useCase.useCase.method,
        methodParameters: useCase.useCase.getArgs(),
      })),
    };
  }

  private groupUseCasesByContractKeepingOrder(
    map: OrderedContractUseCaseMap,
    useCase: GenericUseCase,
    order: number
  ): OrderedContractUseCaseMap {
    if (!map[useCase.contractAddress]) {
      map[useCase.contractAddress] = {
        contractAddress: useCase.contractAddress,
        useCases: [],
      };
    }
    map[useCase.contractAddress].useCases.push({
      order,
      useCase,
    });
    return map;
  }

  private decodeReturnValues(ret: CallReturnContext): string[] {
    return ret.returnValues.map((v) => {
      if (typeof v === "object" && v.type === "BigNumber") {
        return BigNumber.from(v.hex).toString();
      }
      return v;
    });
  }

  private processMulticallResult(
    res: ContractCallResults
  ): ExecutionResponse[] {
    return Object.entries(res.results).reduce(
      (orderedResult, [, contractResult]) => {
        return contractResult.callsReturnContext.reduce((obj, cur) => {
          const order = Number(cur.reference);
          const value = this.decodeReturnValues(cur);
          orderedResult[order] = successResponse({
            success: cur.success,
            method: cur.methodName,
            params: {
              args: cur.methodParameters,
              callValue: undefined,
            },
            value:
              Array.isArray(value) && value.length === 1 ? value[0] : value,
          });

          return orderedResult;
        }, orderedResult);
      },
      []
    );
  }
}
