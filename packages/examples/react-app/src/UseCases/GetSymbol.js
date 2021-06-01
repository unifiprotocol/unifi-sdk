import { ContractUseCase } from "@unifiprotocol/core-sdk";
import { ERC20Methods } from "./ERC20Methods";

export class GetSymbol extends ContractUseCase {
  constructor(params) {
    super(params.tokenAddress, ERC20Methods.Symbol, params, false);
  }
}
