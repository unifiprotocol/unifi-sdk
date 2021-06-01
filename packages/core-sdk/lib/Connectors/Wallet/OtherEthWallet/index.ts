import { IAdapter } from "../../../Adapters";
import { Blockchains } from "../../../Types";
import { MetamaskConnector } from "../Metamask";
import { otherEthWalletMetadata } from "./OtherEthWalletMetadata";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class OtherEthWalletConnector extends MetamaskConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, otherEthWalletMetadata);
  }
  async isAvailable() {
    return !!this.getAgent();
  }
}
