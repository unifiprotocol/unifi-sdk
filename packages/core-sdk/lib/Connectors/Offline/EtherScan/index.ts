import { blockchainToEthChainId } from "../../../Adapters/Helpers";
import { IAdapter } from "../../../Adapters/IAdapter";
import { ethers } from "ethers";
import { OfflineConnector } from "../OfflineConnector";

export class EtherScanConnector extends OfflineConnector {
  async connect(): Promise<IAdapter> {
    const chainId = blockchainToEthChainId(this.blockchain);
    this.adapter.setProvider(new ethers.providers.EtherscanProvider(chainId));
    return this.adapter;
  }
}
