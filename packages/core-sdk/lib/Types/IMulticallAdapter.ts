import { ExecutionResponse } from "./IAdapter";
import { GenericUseCase } from "../Entities";

export interface IMulticallAdapter {
  executeGrouped(
    useCaseGroups: GenericUseCase[][]
  ): Promise<ExecutionResponse[][]>;

  execute(useCases: GenericUseCase[]): Promise<ExecutionResponse[]>;

  isMulticallSupported: boolean;
}
