import { ExecutionResponse } from "../Adapters";
import { GenericUseCase } from "../Entities";

export interface IMulticallAdapter {
  executeGrouped(
    useCaseGroups: GenericUseCase[][]
  ): Promise<ExecutionResponse[][]>;

  execute(useCases: GenericUseCase[]): Promise<ExecutionResponse[]>;
}
