import { IAdapter } from "../Adapters";

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

  execute(adapter: IAdapter) {
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
