import { Blockchains } from "../../../Types";
import { web3AdapterFactory } from "../../../Adapters";
import { MetamaskBaseConnector } from "../Metamask/MetamaskBaseConnector";
import { binanceWalletMetadata } from "./BinanceMetadata";

declare global {
  interface Window {
    BinanceChain: any;
  }
}

export class BinanceChainWalletConnector extends MetamaskBaseConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, binanceWalletMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }
  getAgent(): any {
    return window.BinanceChain;
  }
  async isAvailable(): Promise<boolean> {
    return !!this.getAgent();
  }
}
