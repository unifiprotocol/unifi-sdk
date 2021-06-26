import { ContractUseCase } from "@unifiprotocol/core-sdk";
import { ERC20ABI } from "../ABIs/ERC20";
import { ERC20Methods } from "./ERC20Methods";

export class GetTokenData extends ContractUseCase {
  constructor(params) {
    super(params.tokenAddress, ERC20Methods.Symbol, params, false);
  }
  execute(adapter) {
    return adapter
      .executeMulti([
        {
          reference: this.params.tokenAddress,
          contractAddress: this.params.tokenAddress,
          abi: ERC20ABI,
          calls: [
            { reference: "symbol", methodName: ERC20Methods.Symbol },
            { reference: "decimals", methodName: ERC20Methods.Decimals },
            { reference: "totalSupply", methodName: ERC20Methods.TotalSupply },
          ],
        },
      ])
      .then((res) => {
        if (!res.success) {
          return res;
        }

        const data = res.value[this.params.tokenAddress];

        return {
          ...res,
          value: {
            decimals: data.decimals[0],
            symbol: data.symbol[0],
            totalSupply: data.totalSupply[0] / Math.pow(10, data.decimals[0]),
          },
        };
      });
  }
}
