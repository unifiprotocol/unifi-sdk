import { ExecutionResponse } from "./IAdapter";
import { GenericUseCase } from "../Entities";

export interface IMulticallExecuteOptions {
  blockHeight?: string;
}
export interface IMulticallAdapter {
  executeGrouped(
    useCaseGroups: GenericUseCase[][],
    executeOptions?: IMulticallExecuteOptions
  ): Promise<ExecutionResponse[][]>;

  execute(
    useCases: GenericUseCase[],
    executeOptions?: IMulticallExecuteOptions
  ): Promise<ExecutionResponse[]>;

  isMulticallSupported: boolean;
}
