import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { BNB } from "./NativeToken";

export class BscAdapter extends EthBaseAdapter {
  constructor() {
    super(Blockchains.Binance, BNB, EthChainIds.Bsc, "https://bscscan.com");
  }
}
