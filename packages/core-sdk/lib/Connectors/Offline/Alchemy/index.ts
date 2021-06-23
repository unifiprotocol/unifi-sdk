import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { Blockchains } from "../../../Types";
import { alchemyMetadata } from "./AlchemyMetadata";

const API_KEY = "DPREQ9e0Op53wPlvBiUOyPIBFcs8wlPo";

export class AlchemyConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, alchemyMetadata);
  }
  async connect(): Promise<IAdapter> {
    const network =
      this.blockchain === Blockchains.EthereumRopsten ? "ropsten" : "homestead";
    this.adapter.setProvider(
      new ethers.providers.AlchemyProvider(network, API_KEY)
    );
    return this.adapter;
  }
}
