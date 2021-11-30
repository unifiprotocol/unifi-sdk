import { ethers } from "ethers";
import { Web3MulticallAdapter } from "../../Adapters";

import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import {
  EthChainIds,
  IConnectorAdapters,
  IBlockchainConfig,
  OfflineConnectors,
} from "../../Types";
import { BaseConnector } from "../BaseConnector";

export class CloudflareConnector extends BaseConnector {
  public readonly supportedChainIds = [
    EthChainIds.Eth,
    EthChainIds.Polygon,
    EthChainIds.EthRopsten,
    // ...more
  ];

  constructor(config: IBlockchainConfig) {
    super(
      {
        displayName: OfflineConnectors.Cloudflare,
        isWallet: false,
        name: OfflineConnectors.Cloudflare,
      },
      config
    );

    if (!this.supportedChainIds.includes(this.config.chainId)) {
      throw new Error(
        `Cloudflare does not support the blockchain "${this.config.blockchain}(${this.config.chainId})`
      );
    }
  }

  async connect(): Promise<IConnectorAdapters> {
    const adapter = new Web3BaseAdapter(this.config);
    adapter.setProvider(
      new ethers.providers.CloudflareProvider(this.config.chainId)
    );
    const multicall = new Web3MulticallAdapter(adapter);
    return { adapter, multicall };
  }
}
