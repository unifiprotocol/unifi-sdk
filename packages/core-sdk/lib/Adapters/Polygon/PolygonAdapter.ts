import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { MATICNativeToken } from "../../Tokens";

export class PolygonAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Polygon,
      MATICNativeToken,
      EthChainIds.Polygon,
      "https://polygonscan.com/"
    );
  }
}
