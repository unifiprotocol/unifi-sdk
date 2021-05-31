import { IAdapter } from "../../../Adapters/IAdapter";
import { WalletConnector } from "../../../Connectors/Wallet/WalletConnector";
import { MetamaskConnector } from "../Metamask";

declare global {
  interface Window {
    ethereum: any;
  }
}
export class MathWalletConnector extends MetamaskConnector {
  async isAvailable() {
    return !!this.getAgent() && window.ethereum.isMathWallet;
  }
}
