import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { BigNumber } from "ethers";
import { IAdapter } from "./Adapters";
import { ContractUseCase } from "./Entities";
import { BN } from "./Utils/BigNumber";

type GenericUseCase = ContractUseCase<any, any, any>;

type GroupedUseCases = {
  contractAddress: string;
  useCases: Array<{ order: number; useCase: GenericUseCase }>;
};
type OrderedContractUseCaseMap = Record<string, GroupedUseCases>;

export class MulticallAdapter {
  private multicall: Multicall;
  constructor(private adapter: IAdapter) {
    this.multicall = new Multicall({
      ethersProvider: this.adapter.getProvider(),
      tryAggregate: true,
    });
  }

  execute(useCases: GenericUseCase[]): Promise<any> {
    // todo keep order
    const callContexts: ContractCallContext[] = Object.values(
      useCases.reduce(this.groupUseCasesByContractKeepingOrder.bind(this))
    ).map(this.mapGroupedUseCasesToMulticallCtx);

    return this.multicall
      .call(callContexts)
      .then(this.processMulticallResult.bind(this));
  }

  mapGroupedUseCasesToMulticallCtx(
    group: GroupedUseCases
  ): ContractCallContext {
    return {
      reference: group.contractAddress,
      contractAddress: group.contractAddress,
      abi: this.adapter.getContractInterface(group.contractAddress) as any[],
      calls: group.useCases.map((useCase) => ({
        reference: `${useCase.order}`,
        methodName: useCase.useCase.method,
        methodParameters: useCase.useCase.params,
      })),
    };
  }

  groupUseCasesByContractKeepingOrder(
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

  decodeReturnValues(ret: CallReturnContext): any[] {
    return ret.returnValues.map((v) => {
      if (typeof v === "object" && v.type === "BigNumber") {
        return BigNumber.from(v.hex).toString();
      }
      return v;
    });
  }

  processMulticallResult(res: ContractCallResults) {
    return Object.entries(res.results).reduce(
      (orderedResult: any[], [, contractResult]) => {
        return contractResult.callsReturnContext.reduce((obj, cur) => {
          const order = Number(cur.reference);
          orderedResult[order] = this.decodeReturnValues.bind(cur.returnValues);

          return orderedResult;
        }, orderedResult);
      },
      []
    );
  }
}
