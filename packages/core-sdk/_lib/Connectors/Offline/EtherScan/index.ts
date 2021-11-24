import { IAdapter, blockchainToEthChainId } from "../../../Adapters";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { Blockchains } from "../../../Types";
import { etherScanMetadata } from "./EtherScanMetadata";
import { web3AdapterFactory } from "../../../Adapters";

export class EtherScanConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, etherScanMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }
  async connect(): Promise<IAdapter> {
    const chainId = blockchainToEthChainId(this.blockchain);
    this.adapter.setProvider(new ethers.providers.EtherscanProvider(chainId));
    return this.adapter;
  }
}
