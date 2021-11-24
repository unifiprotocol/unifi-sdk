import { Multicall } from "ethereum-multicall";
import { IAdapter } from "../../Adapters";
import { EthMulticallAdapter } from "./EthMulticallAdapter";

export class IotexMulticallAdapter extends EthMulticallAdapter {
  constructor(adapter: IAdapter) {
    super(adapter);
    this.multicall = new Multicall({
      multicallCustomContractAddress:
        "0xacce294bf7d25fe8c5c64ae45197d3878f68403b",
      ethersProvider: this.adapter.getProvider(),
      tryAggregate: false,
    });
  }
}
