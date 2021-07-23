import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { IOTXNativeToken } from "../../Tokens";

export class IotexAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Iotex,
      IOTXNativeToken,
      EthChainIds.Iotex,
      "https://iotexscan.io/"
    );
  }
}
