import { IBlockchainConfig, OfflineConnectors } from "../../../Types";
import { Web3BaseConnector } from "../../../Connectors";

export class HarmonyConnector extends Web3BaseConnector {
  constructor(config: IBlockchainConfig) {
    super(
      "https://api.harmony.one",
      {
        displayName: "Harmony",
        isWallet: false,
        name: OfflineConnectors.Harmony,
      },
      config
    );
  }
}
