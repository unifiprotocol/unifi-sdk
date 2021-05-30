import { IAdapter } from "@root/Adapters/IAdapter";
import { WalletConnector } from "@root/Connectors/Wallet/WalletConnector";
import { MetamaskConnector } from "../Metamask";

declare global {
  interface Window {
    ethereum: any;
  }
}
export class MathWalletConnector extends MetamaskConnector {
  isAvailable() {
    return !!this.getAgent() && window.ethereum.isMathWallet;
  }
}
