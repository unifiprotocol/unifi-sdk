import { HarmonyAdapter, HarmonyProvider, IAdapter } from "../../../Adapters";
import { InvalidNetworkError, WalletNotDetectedError } from "../../../Errors";
import { Blockchains } from "../../../Types";
import { BaseConnector } from "../../BaseConnector";
import { harmonyOneWalletMetadata } from "./HarmonyOneWalletMetadata";

declare global {
  interface Window {
    onewallet: HarmonyProvider;
  }
}
export class HarmonyOneWalletConnector extends BaseConnector {
  protected adapter: HarmonyAdapter;
  constructor(protected blockchain: Blockchains) {
    super(blockchain, harmonyOneWalletMetadata);
    this.adapter = new HarmonyAdapter(harmonyOneWalletMetadata.name);
  }
  async connect(): Promise<IAdapter> {
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.displayName);
    }

    const chainId = this.getAgent().network.chain_id;

    if (chainId !== 1) {
      throw new InvalidNetworkError(`${chainId}`);
    }

    const account = await this.getAgent().getAccount();

    this.initEventController();

    const address = account.address;

    this.adapter.setAddress(address);
    this.adapter.setProvider(this.getAgent());

    return this.adapter;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isOneWallet;
  }

  protected getAgent(): HarmonyProvider {
    return window.onewallet;
  }

  async initEventController(): Promise<void> {
    /*this.getAgent().on("accountsChanged", ([address]: string[]) => {
      this.adapter.setAddress(address);
      this.emitter.emit("AddressChanged", address);
    });

    this.getAgent().on("chainChanged", (chainId: string) => {
      this.emitter.emit("NetworkChanged", hexToDec(chainId));
    });*/
  }

  async disconnect(): Promise<void> {
    await super.disconnect();
    return this.getAgent().forgetIdentity();
  }
}
