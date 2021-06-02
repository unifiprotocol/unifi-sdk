import { IAdapter, blockchainToEthChainId } from "../../../Adapters";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";
import { Blockchains } from "../../../Types";
import { etherScanMetadata } from "./EtherScanMetadata";

export class EtherScanConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, etherScanMetadata);
  }
  async connect(): Promise<IAdapter> {
    const chainId = blockchainToEthChainId(this.blockchain);
    this.adapter.setProvider(new ethers.providers.EtherscanProvider(chainId));
    return this.adapter;
  }
}
