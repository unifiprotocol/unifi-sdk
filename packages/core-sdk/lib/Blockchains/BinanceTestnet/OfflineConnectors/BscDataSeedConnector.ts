import { IBlockchainConfig, OfflineConnectors } from "../../../Types";
import { Web3BaseConnector } from "../../../Connectors";

export class BscTesnetDataSeedConnector extends Web3BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      "https://bsc-dataseed.binance.org/",
      {
        displayName: "Bsc Tesnet Dataseed",
        isWallet: false,
        name: OfflineConnectors.BscDataseedTestnet,
      },
      config
    );
  }
}
