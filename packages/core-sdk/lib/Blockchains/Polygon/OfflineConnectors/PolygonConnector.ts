import { IBlockchainConfig, OfflineConnectors } from "../../../Types";
import { Web3BaseConnector } from "../../../Connectors";

export class PolygonConnector extends Web3BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      "https://polygon-rpc.com",
      {
        displayName: "Polygon",
        isWallet: false,
        name: OfflineConnectors.Polygon,
      },
      config
    );
  }
}
