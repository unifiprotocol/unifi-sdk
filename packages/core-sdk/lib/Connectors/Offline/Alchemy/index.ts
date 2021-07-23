import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { Blockchains } from "../../../Types";
import { alchemyMetadata } from "./AlchemyMetadata";
import { web3AdapterFactory } from "../../../Adapters";

const API_KEY = "DPREQ9e0Op53wPlvBiUOyPIBFcs8wlPo";

export class AlchemyConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, alchemyMetadata);
    this.adapter = web3AdapterFactory(blockchain);
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
