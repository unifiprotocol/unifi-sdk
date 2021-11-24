import { Multicall } from "ethereum-multicall";
import { IAdapter } from "../../Adapters";
import { EthMulticallAdapter } from "./EthMulticallAdapter";

export class BinanceTestnetMulticallAdapter extends EthMulticallAdapter {
  constructor(adapter: IAdapter) {
    super(adapter);
    this.multicall = new Multicall({
      multicallCustomContractAddress:
        "0xae11c5b5f29a6a25e955f0cb8ddcc416f522af5c",
      ethersProvider: this.adapter.getProvider(),
      tryAggregate: false,
    });
  }
}
