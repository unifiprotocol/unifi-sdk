import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { bscDataSeedMetadata } from "./BscDataSeedMetadata";
import { web3AdapterFactory } from "../../../Adapters";

export class BscDataSeedConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, bscDataSeedMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }

  async connect(): Promise<IAdapter> {
    this.adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        "https://bsc-dataseed.binance.org/",
        EthChainIds.Bsc
      )
    );
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
