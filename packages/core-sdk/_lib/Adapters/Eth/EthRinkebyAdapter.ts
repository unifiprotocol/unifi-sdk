import { Blockchains, EthChainIds } from "../../Types";
import { EthBaseAdapter } from "./EthBaseAdapter";
import { ETHNativeToken } from "../../Tokens/ETHNativeToken";

export class EthRinkebyAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.EthereumRinkeby,
      ETHNativeToken,
      EthChainIds.EthRinkeby,
      "https://rinkeby.etherscan.io"
    );
  }
}
