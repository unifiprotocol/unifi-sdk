import { web3AdapterFactory } from "../../../Adapters";
import { Blockchains } from "../../../Types";
import { MetamaskBaseConnector } from "../Metamask/MetamaskBaseConnector";
import { mathWalletMetadata } from "./MathwalletMetadata";

declare global {
  interface Window {
    ethereum: any;
  }
}
export class MathWalletConnector extends MetamaskBaseConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, mathWalletMetadata);
    this.adapter = web3AdapterFactory(blockchain);
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isMathWallet;
  }
}
