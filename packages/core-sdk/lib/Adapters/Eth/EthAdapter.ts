import { Blockchains, EthChainIds } from "../../Types";
import { EthBaseAdapter } from "./EthBaseAdapter";
import { Ethereum } from "./NativeToken";

export class EthAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Ethereum,
      Ethereum,
      EthChainIds.Eth,
      "https://etherscan.io"
    );
  }
}
