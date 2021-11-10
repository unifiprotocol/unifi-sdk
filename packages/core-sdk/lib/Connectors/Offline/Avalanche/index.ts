import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { avalancheMetadata } from "./AvalancheMetadata";
import { web3AdapterFactory } from "../../../Adapters";

export class AvalancheConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, avalancheMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }

  async connect(): Promise<IAdapter> {
    this.adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        "https://api.avax.network/ext/bc/C/rpc",
        EthChainIds.Avalanche
      )
    );
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
