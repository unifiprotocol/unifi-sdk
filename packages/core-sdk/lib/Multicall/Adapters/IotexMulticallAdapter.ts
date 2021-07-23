import { Multicall } from "ethereum-multicall";
import { IAdapter } from "../../Adapters";
import { EthMulticallAdapter } from "./EthMulticallAdapter";

export class IotexMulticallAdapter extends EthMulticallAdapter {
  constructor(adapter: IAdapter) {
    super(adapter);
    this.multicall = new Multicall({
      multicallCustomContractAddress:
        "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
      ethersProvider: this.adapter.getProvider(),
      tryAggregate: false,
    });
  }
}
