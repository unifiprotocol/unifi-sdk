import { IAdapter } from "../../../Adapters";
import { Blockchains } from "../../../Types";
import { MetamaskConnector } from "../Metamask";
import { mathWalletMetadata } from "./MathwalletMetadata";

declare global {
  interface Window {
    ethereum: any;
  }
}
export class MathWalletConnector extends MetamaskConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, mathWalletMetadata);
  }
  async isAvailable() {
    return !!this.getAgent() && this.getAgent().isMathWallet;
  }
}
