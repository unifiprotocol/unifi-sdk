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
    return adapter
      .execute<ResponseValue>(
        this.contractAddress,
        this.method,
        {
          args: this.getArgs(),
          callValue: this.getCallValue(),
        },
        this.isWrite
      )
      .then(this.formatResponse.bind(this));
  }

  formatResponse(
    response: ExecutionResponse<any>
  ): ExecutionResponse<ResponseValue> {
    return response;
  }
}

export type GenericUseCase = ContractUseCase<any, any, any>;
