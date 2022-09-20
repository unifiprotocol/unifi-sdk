import { ContractUseCase } from "@unifiprotocol/core-sdk";
import { ERC20ContractMethods } from "./Types";

export interface TransferParams {
  tokenAddress: string;
  recipient: string;
  amount: string;
}

export class Transfer extends ContractUseCase<
  ERC20ContractMethods,
  TransferParams,
  string
> {
  constructor(params: TransferParams) {
    super(params.tokenAddress, ERC20ContractMethods.Transfer, params, true);
  }

  getArgs() {
    return [this.params.recipient, this.params.amount];
  }
}
