import { MetamaskConnector } from "./MetamaskConnector";
import { IBlockchainConfig, WalletConnectors } from "../../Types";

export class TokenPocketConnector extends MetamaskConnector {
  constructor(config: IBlockchainConfig) {
    super(config, {
      name: WalletConnectors.TokenPocketWallet,
      displayName: "Token Pocket",
      isWallet: true,
    });
  }
  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isTokenPocket;
  }
}
