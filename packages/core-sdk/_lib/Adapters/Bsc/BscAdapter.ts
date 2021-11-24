import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { BNBNativeToken } from "../../Tokens/BNBNativeToken";

export class BscAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Binance,
      BNBNativeToken,
      EthChainIds.Bsc,
      "https://bscscan.com"
    );
  }
}
