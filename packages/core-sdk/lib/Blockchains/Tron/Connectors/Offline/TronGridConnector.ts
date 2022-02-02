import { ethers } from "ethers";

import {
  EthChainIds,
  IConnectorAdapters,
  IBlockchainConfig,
  OfflineConnectors,
} from "../../../../Types";
import { BaseConnector } from "../../../../Connectors/BaseConnector";
import { TronAdapter } from "../../Adapters/TronAdapter";

import { MulticallBaseAdapter } from "../../../../Adapters/Multicall/MulticallBaseAdapter";
import TronWeb from "tronweb";

export class TronGridConnector extends BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      {
        displayName: OfflineConnectors.TronGrid,
        isWallet: false,
        name: OfflineConnectors.TronGrid,
      },
      config
    );
  }

  async connect(): Promise<IConnectorAdapters> {
    const adapter = new TronAdapter(this.config);
    const provider = new TronWeb({
      fullHost: "https://api.trongrid.io/",
    });
    provider.setAddress("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
    adapter.setProvider(provider);
    const multicall = new MulticallBaseAdapter(adapter);
    return { adapter, multicall };
  }
}
