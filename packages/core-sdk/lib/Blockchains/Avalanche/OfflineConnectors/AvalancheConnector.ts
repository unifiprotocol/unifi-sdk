import { IBlockchainConfig, OfflineConnectors } from "../../../Types";
import { Web3BaseConnector } from "../../../Connectors";

export class AvalancheConnector extends Web3BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      "https://api.avax.network/ext/bc/C/rpc",
      {
        displayName: "Avalanche",
        isWallet: false,
        name: OfflineConnectors.Avalanche,
      },
      config
    );
  }
}
