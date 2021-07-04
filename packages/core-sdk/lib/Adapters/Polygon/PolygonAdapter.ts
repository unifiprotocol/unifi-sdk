import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { MATIC } from "./NativeToken";

export class PolygonAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Polygon,
      MATIC,
      EthChainIds.Polygon,
      "https://polygonscan.com/"
    );
  }
}
