import { ContractUseCase } from "@unifiprotocol/core-sdk";
import { ERC20ABI } from "../ABIs/ERC20";
import { ERC20Methods } from "./ERC20Methods";

export class GetPoolData extends ContractUseCase {
  constructor(params) {
    super(null, null, params, false);
  }
  mapResult(res) {
    const tokenA = res.value[this.params.tokenAAddress];
    const tokenB = res.value[this.params.tokenBAddress];

    return {
      symbolA: tokenA.symbol[0],
      symbolB: tokenB.symbol[0],
      balanceA: tokenA.balance[0] / Math.pow(10, tokenA.decimals[0]),
      balanceB: tokenB.balance[0] / Math.pow(10, tokenB.decimals[0]),
    };
  }

  execute(adapter) {
    return adapter
      .executeMulti(
        [this.params.tokenAAddress, this.params.tokenBAddress].map(
          (tokenAddress) => ({
            reference: tokenAddress,
            contractAddress: tokenAddress,
            abi: ERC20ABI,
            calls: [
              {
                reference: "balance",
                methodName: ERC20Methods.BalanceOf,
                methodParameters: [this.params.pairAddress],
              },
              {
                reference: "symbol",
                methodName: ERC20Methods.Symbol,
              },
              {
                reference: "decimals",
                methodName: ERC20Methods.Decimals,
              },
            ],
          })
        )
      )
      .then(this.mapResult.bind(this));
  }
}
