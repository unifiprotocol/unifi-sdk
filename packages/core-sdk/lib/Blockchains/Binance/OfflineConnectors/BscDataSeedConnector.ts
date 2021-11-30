import { ethers } from "ethers";
import { Web3MulticallAdapter } from "../../../Adapters";

import { Web3BaseAdapter } from "../../../Adapters/Web3BaseAdapter";
import {
  EthChainIds,
  IConnectorAdapters,
  IBlockchainConfig,
  OfflineConnectors,
} from "../../../Types";

import { Web3BaseConnector } from "../../../Connectors";

export class BscDataSeedConnector extends Web3BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      "https://bsc-dataseed.binance.org/",
      {
        displayName: "Bsc Dataseed",
        isWallet: false,
        name: OfflineConnectors.BscDataseed,
      },
      config
    );
  }
}
