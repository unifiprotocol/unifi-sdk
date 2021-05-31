import { IAdapter, ExecutionResponse } from "../Adapters";

export abstract class ContractUseCase<
  ContractMethod extends string,
  ContractParams,
  Response = ExecutionResponse
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

  execute(adapter: IAdapter) {
    return adapter.execute<Response>(
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
