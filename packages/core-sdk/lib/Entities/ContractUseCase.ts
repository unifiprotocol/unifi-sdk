import { ExecutionResponse, IAdapter } from "../Types";

export abstract class ContractUseCase<
  ContractMethod extends string,
  ContractParams,
  ResponseValue = any
> {
  constructor(
    public contractAddress: string,
    public method: ContractMethod,
    public params: ContractParams,
    public isWrite: boolean
  ) {}

  getCallValue(): string | number | undefined {
    return undefined;
  }

  getArgs(): any[] {
    return [];
  }

  execute(adapter: IAdapter): Promise<ExecutionResponse<ResponseValue>> {
    return adapter.execute<ResponseValue>(
      this.contractAddress,
      this.method,
      {
        args: this.getArgs(),
        callValue: this.getCallValue(),
      },
      this.isWrite
    );
  }
}

export type GenericUseCase = ContractUseCase<any, any, any>;
