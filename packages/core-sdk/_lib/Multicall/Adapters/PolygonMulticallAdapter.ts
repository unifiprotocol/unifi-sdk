import { Multicall } from "ethereum-multicall";
import { IAdapter } from "../../Adapters";
import { EthMulticallAdapter } from "./EthMulticallAdapter";

export class PolygonMulticallAdapter extends EthMulticallAdapter {
  constructor(adapter: IAdapter) {
    super(adapter);
    this.multicall = new Multicall({
      multicallCustomContractAddress:
        "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
      ethersProvider: this.adapter.getProvider(),
      tryAggregate: false,
    });
  }
}
