import {
  HarmonyAdapter,
  IAdapter,
  web3AdapterFactory,
} from "../../../Adapters";
import { InvalidNetworkError, WalletNotDetectedError } from "../../../Errors";
import { Blockchains } from "../../../Types";
import { MetamaskBaseConnector } from "../Metamask/MetamaskBaseConnector";
import { mathWalletMetadata } from "./MathwalletMetadata";

declare global {
  interface Window {
    ethereum: any;
    harmony: any;
  }
}
export class MathWalletConnector extends MetamaskBaseConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, mathWalletMetadata);
    if (blockchain === Blockchains.Harmony) {
      this.adapter = new HarmonyAdapter(mathWalletMetadata.name);
    } else {
      this.adapter = web3AdapterFactory(blockchain);
    }
  }

  protected async connectToHarmony(): Promise<IAdapter> {
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.displayName);
    }

    const chainId = this.getAgent().network.chain_id;

    if (chainId !== 1) {
      throw new InvalidNetworkError(chainId);
    }

    const account = await this.getAgent().getAccount();

    this.initEventController();

    const address = account.address;

    this.adapter.setAddress(address);
    this.adapter.setProvider(this.getAgent());

    return this.adapter;
  }

  async connect(): Promise<IAdapter> {
    debugger;
    if (this.blockchain !== Blockchains.Harmony) {
      return super.connect();
    }
    return this.connectToHarmony();
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isMathWallet;
  }

  getAgent(): any {
    return this.blockchain === Blockchains.Harmony
      ? window.harmony
      : window.ethereum;
  }

  async initEventController(): Promise<void> {
    if (this.blockchain === Blockchains.Harmony) {
      return;
    }
    return super.initEventController();
  }
}
