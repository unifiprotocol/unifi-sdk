import { Blockchains, EthChainIds } from "../../../Types";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { binanceMetadata } from "./BinanceMetadata";
import { web3AdapterFactory } from "../../../Adapters";

export class BinanceConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, binanceMetadata);
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

export class BinanceTestnetConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, binanceMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }

  async connect(): Promise<IAdapter> {
    this.adapter.setProvider(
      new ethers.providers.StaticJsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/",
        EthChainIds.BscTestnet
      )
    );
    return this.adapter;
  }

  async logout(): Promise<void> {}
}
