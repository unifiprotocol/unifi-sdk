import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { bscDataSeedMetadata } from "./BscDataSeedMetadata";

export class BscDataSeedConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, bscDataSeedMetadata);
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
