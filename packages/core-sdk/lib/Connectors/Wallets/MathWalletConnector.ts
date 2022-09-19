import { MetamaskConnector } from "./MetamaskConnector";
import { IBlockchainConfig } from "../../Types/IBlockchainConfig";
import { Blockchains, IConnectorAdapters, WalletConnectors } from "../../Types";

declare global {
  interface Window {
    ethereum: any;
    harmony: any;
  }
}

export class MathWalletConnector extends MetamaskConnector {
  constructor(blockchainConfig: IBlockchainConfig) {
    super(blockchainConfig, {
      name: WalletConnectors.MathWallet,
      displayName: "Mathwallet",
      isWallet: true,
    });
  }

  async _connect(): Promise<IConnectorAdapters> {
      return super._connect();
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isMathWallet;
  }

  getAgent(): any {
    return this.config.blockchain === Blockchains.Harmony
      ? window.harmony
      : window.ethereum;
  }
}
