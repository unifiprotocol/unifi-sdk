import { Blockchains, EthChainIds } from "../../Types";
import { EthBaseAdapter } from "./EthBaseAdapter";
import { ETHNativeToken } from "../../Tokens/ETHNativeToken";

export class EthAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Ethereum,
      ETHNativeToken,
      EthChainIds.Eth,
      "https://etherscan.io"
    );
  }
}
