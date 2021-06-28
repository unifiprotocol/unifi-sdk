import { ContractUseCase } from "@unifiprotocol/core-sdk";
import { ERC20Methods } from "./ERC20Methods";

export class GetDecimals extends ContractUseCase {
  constructor(params) {
    super(params.tokenAddress, ERC20Methods.Decimals, params, false);
  }
}
