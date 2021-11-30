import { IBlockchainConfig, OfflineConnectors } from "../../../Types";
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