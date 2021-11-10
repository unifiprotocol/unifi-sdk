import { Multicall } from "ethereum-multicall";
import { IAdapter } from "../../Adapters";
import { EthMulticallAdapter } from "./EthMulticallAdapter";

export class AvalancheMulticallAdapter extends EthMulticallAdapter {
  constructor(adapter: IAdapter) {
    super(adapter);
    this.multicall = new Multicall({
      multicallCustomContractAddress:
        "0xa00FB557AA68d2e98A830642DBbFA534E8512E5f",
      ethersProvider: this.adapter.getProvider(),
      tryAggregate: false,
    });
  }
}
