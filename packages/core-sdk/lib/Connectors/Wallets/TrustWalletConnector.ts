import { MetamaskConnector } from "./MetamaskConnector";
import { IBlockchainConfig, WalletConnectors } from "../../Types";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class TrustWalletConnector extends MetamaskConnector {
  constructor(config: IBlockchainConfig) {
    super(config, {
      name: WalletConnectors.TrustWallet,
      displayName: "TrustWallet",
      isWallet: true,
    });
  }

  protected getAgent(): any {
    return window.ethereum;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isTrust;
  }
}
