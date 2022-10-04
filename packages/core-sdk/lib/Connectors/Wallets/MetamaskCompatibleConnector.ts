import { MetamaskConnector } from "./MetamaskConnector";
import { IBlockchainConfig, WalletConnectors } from "../../Types";

export class MetamaskCompatibleConnector extends MetamaskConnector {
  constructor(config: IBlockchainConfig) {
    super(config, {
      name: WalletConnectors.MetamaskCompatible,
      displayName: "Web3 Compatible",
      isWallet: true,
    });
  }
  async isAvailable(): Promise<boolean> {
    return !!this.getAgent();
  }
}
