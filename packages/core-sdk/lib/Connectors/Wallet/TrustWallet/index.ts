import { IAdapter } from "../../../Adapters";
import { WalletConnector } from "../..//Wallet/WalletConnector";
import { InvalidNetworkError, WalletNotDetectedError } from "../../../Errors";
import { hexToDec } from "../../../Utils/BigNumber";
import { ethers } from "ethers";
import { MetamaskConnector } from "../Metamask";
import { trustWalletMetadata } from "./TrustWalletMetadata";
import { Blockchains } from "../../../Types";

declare global {
  interface Window {
    ethereum: any;
  }
}

export class TrustWalletConnector extends MetamaskConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, trustWalletMetadata);
  }

  protected getAgent(): any {
    return window.ethereum;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isTrust;
  }
}
