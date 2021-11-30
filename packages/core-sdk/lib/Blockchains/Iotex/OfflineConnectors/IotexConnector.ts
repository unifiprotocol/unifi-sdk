import { IBlockchainConfig, OfflineConnectors } from "../../../Types";
import { Web3BaseConnector } from "../../../Connectors";

export class IotexConnector extends Web3BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      "https://babel-api.mainnet.iotex.io",
      {
        displayName: "Iotex",
        isWallet: false,
        name: OfflineConnectors.Iotex,
      },
      config
    );
  }
}
