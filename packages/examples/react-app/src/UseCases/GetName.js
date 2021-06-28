import { ContractUseCase } from "@unifiprotocol/core-sdk";
import { ERC20Methods } from "./ERC20Methods";

export class GetName extends ContractUseCase {
  constructor(params) {
    super(params.tokenAddress, ERC20Methods.Name, params, false);
  }
}
