import { ContractUseCase } from "@unifiprotocol/core-sdk";
import { ERC20ContractMethods } from "./Types";

export interface TransferParams {
  tokenAddress: string;
  spender: string;
  amount: string;
}

export class Approve extends ContractUseCase<
  ERC20ContractMethods,
  TransferParams,
  string
> {
  constructor(params: TransferParams) {
    super(params.tokenAddress, ERC20ContractMethods.Approve, params, true);
  }

  getArgs() {
    return [this.params.spender, this.params.amount];
  }
}
