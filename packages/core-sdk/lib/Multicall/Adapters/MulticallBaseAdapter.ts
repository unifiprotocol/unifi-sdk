import { ExecutionResponse, IAdapter } from "../../Adapters";
import { GenericUseCase } from "../../Entities";
import { IMulticallAdapter } from "../IMulticallAdapter";

export abstract class MulticallBaseAdapter implements IMulticallAdapter {
  constructor(protected adapter: IAdapter) {}

  protected groupResultsByAmount(size: number) {
    return (results: ExecutionResponse[]): ExecutionResponse[][] => {
      const groupedResults: ExecutionResponse[][] = [];
      while (results.length !== 0) {
        groupedResults.push(results.splice(0, size));
      }
      return groupedResults;
    };
  }

  async executeGrouped(
    useCaseGroups: GenericUseCase[][]
  ): Promise<ExecutionResponse[][]> {
    const useCases: GenericUseCase[] = useCaseGroups.reduce(
      (list, group) => [...list, ...group],
      []
    );
    if (useCaseGroups.length === 0) {
      return [];
    }
    return this.execute(useCases).then(
      this.groupResultsByAmount(useCaseGroups[0].length)
    );
  }

  abstract execute(useCases: GenericUseCase[]): Promise<ExecutionResponse[]>;
}
