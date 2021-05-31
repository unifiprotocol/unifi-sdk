import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { EthChainIds } from "../../Types";
import { BNB } from "./NativeToken";

export class BscAdapter extends EthBaseAdapter {
  constructor() {
    super(BNB, EthChainIds.Bsc, "https://bscscan.com");
  }
}
