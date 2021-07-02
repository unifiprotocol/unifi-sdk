import { Blockchains, EthChainIds } from "../../Types";
import { EthBaseAdapter } from "./EthBaseAdapter";
import { ETHNativeToken } from "../../Tokens/ETHNativeToken";

export class EthRopstenAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.EthereumRopsten,
      ETHNativeToken,
      EthChainIds.EthRopsten,
      "https://ropsten.etherscan.io"
    );
  }
}
