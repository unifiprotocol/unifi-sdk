import { MetamaskConnector } from "../../../Connectors/Wallets/MetamaskConnector";
import { IBlockchainConfig, WalletConnectors } from "../../../Types";

declare global {
  interface Window {
    BinanceChain: any;
  }
}

export class BinanceChainWalletConnector extends MetamaskConnector {
  constructor(config: IBlockchainConfig) {
    super(config, {
      name: WalletConnectors.Binance,
      displayName: "Binance Chain Wallet",
      isWallet: true,
    });
  }
  getAgent(): any {
    return window.BinanceChain;
  }
  async isAvailable(): Promise<boolean> {
    return !!this.getAgent();
  }
}
