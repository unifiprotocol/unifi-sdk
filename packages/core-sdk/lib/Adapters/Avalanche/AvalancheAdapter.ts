import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { AVAXNativeToken } from "../../Tokens";

export class AvalancheAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Avalanche,
      AVAXNativeToken,
      EthChainIds.Avalanche,
      "https://snowtrace.io"
    );
  }
}
