import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { BNBNativeToken } from "../../Tokens/BNBNativeToken";

export class BscTestnetAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.BinanceTestnet,
      BNBNativeToken,
      EthChainIds.BscTestnet,
      "https://testnet.bscscan.com/"
    );
  }
}
