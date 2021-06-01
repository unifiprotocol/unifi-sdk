import { IAdapter } from "../../../Adapters";
import { Blockchains } from "../../../Types";
import { MetamaskConnector } from "../Metamask";
import { binanceWalletMetadata } from "./BinanceMetadata";

declare global {
  interface Window {
    BinanceChain: any;
  }
}

export class BinanceChainWalletConnector extends MetamaskConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, binanceWalletMetadata);
  }
  getAgent() {
    return window.BinanceChain;
  }
}
