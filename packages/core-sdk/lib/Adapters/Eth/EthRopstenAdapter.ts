import { EthChainIds } from "../../Types";
import { EthBaseAdapter } from "./EthBaseAdapter";
import { Ethereum } from "./NativeToken";

export class EthRopstenAdapter extends EthBaseAdapter {
  constructor() {
    super(Ethereum, EthChainIds.EthRopsten, "https://ropsten.etherscan.io");
  }
}
