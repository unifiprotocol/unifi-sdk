import { EthChainIds } from "../../Types";
import { EthBaseAdapter } from "./EthBaseAdapter";
import { Ethereum } from "./NativeToken";

export class EthAdapter extends EthBaseAdapter {
  constructor() {
    super(Ethereum, EthChainIds.Eth, "https://etherscan.io");
  }

  supportsMulticall(): boolean {
    return true;
  }
}
