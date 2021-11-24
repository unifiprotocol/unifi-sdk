import { Multicall } from "ethereum-multicall";

import { IAdapter } from "../../Adapters";
import { EthMulticallAdapter } from "./EthMulticallAdapter";

export class HarmonyMulticallAdapter extends EthMulticallAdapter {
  constructor(adapter: IAdapter) {
    super(adapter);
    this.multicall = new Multicall({
      multicallCustomContractAddress:
        "0xFE4980f62D708c2A84D3929859Ea226340759320",
      ethersProvider: this.adapter.getProvider(),
      tryAggregate: false,
    });
  }
}
