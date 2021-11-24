import { trustWalletMetadata } from "./TrustWalletMetadata";
import { Blockchains } from "../../../Types";
import { web3AdapterFactory } from "../../../Adapters";
import { MetamaskBaseConnector } from "../Metamask/MetamaskBaseConnector";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class TrustWalletConnector extends MetamaskBaseConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, trustWalletMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }

  protected getAgent(): any {
    return window.ethereum;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isTrust;
  }
}
