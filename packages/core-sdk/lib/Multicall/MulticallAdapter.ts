import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import * as Throttle from "promise-parallel-throttle";

import { BigNumber } from "ethers";
import { ExecutionResponse, IAdapter, successResponse } from "../Adapters";
import { ContractUseCase } from "../Entities";

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

  private async singleExecution(
    useCases: GenericUseCase[]
  ): Promise<ExecutionResponse[]> {
    // Throttle.raw expects Tasks<T> (equivalent to Array<Promise<T>>) as arguments but not resolve correctly
    const promises = useCases.map(
      (useCase) => () => useCase.execute(this.adapter)
    ) as any;
    const { taskResults } = await Throttle.raw<ExecutionResponse>(promises);
    return taskResults;
  }
  private groupResultsByAmount(size: number) {
    return (results: ExecutionResponse[]) => {
      const groupedResults: ExecutionResponse[][] = [];
      while (results.length !== 0) {
        groupedResults.push(results.splice(0, size));
      }
      return groupedResults;
    };
  }

  executeGrouped(
    useCaseGroups: GenericUseCase[][]
  ): Promise<ExecutionResponse[][]> {
    const useCases: GenericUseCase[] = useCaseGroups.reduce(
      (list, group) => [...list, ...group],
      []
    );
    return this.execute(useCases).then(
      this.groupResultsByAmount(useCaseGroups[0].length)
    );
  }

  execute(useCases: GenericUseCase[]): Promise<ExecutionResponse[]> {
    if (!this.adapter.supportsMulticall()) {
      return this.singleExecution(useCases);
    }

    const callContexts: ContractCallContext[] = Object.values(
      useCases.reduce(this.groupUseCasesByContractKeepingOrder.bind(this), {})
    ).map(this.mapGroupedUseCasesToMulticallCtx.bind(this));

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
        methodParameters: useCase.useCase.getArgs(),
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

  decodeReturnValues(ret: CallReturnContext): string[] {
    return ret.returnValues.map((v) => {
      if (typeof v === "object" && v.type === "BigNumber") {
        return BigNumber.from(v.hex).toString();
      }
      return v;
    });
  }

  processMulticallResult(res: ContractCallResults): ExecutionResponse[] {
    return Object.entries(res.results).reduce(
      (orderedResult, [, contractResult]) => {
        return contractResult.callsReturnContext.reduce((obj, cur) => {
          const order = Number(cur.reference);
          const value = this.decodeReturnValues(cur);
          orderedResult[order] = successResponse({
            success: cur.success,
            multicall: true,
            functionName: cur.methodName,
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
