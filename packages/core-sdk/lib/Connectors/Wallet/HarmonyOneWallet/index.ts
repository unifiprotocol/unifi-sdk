import { ExtensionInterface, HarmonyExtension } from "@harmony-js/core";
import { HarmonyAdapter, IAdapter } from "../../../Adapters";
import { InvalidNetworkError, WalletNotDetectedError } from "../../../Errors";
import { Blockchains } from "../../../Types";
import { MetamaskBaseConnector } from "../Metamask/MetamaskBaseConnector";
import { harmonyOneWalletMetadata } from "./HarmonyOneWalletMetadata";

declare global {
  interface Window {
    onewallet: ExtensionInterface;
  }
}
export class HarmonyOneWalletConnector extends MetamaskBaseConnector {
  constructor(protected blockchain: Blockchains) {
    super(blockchain, harmonyOneWalletMetadata);
    this.adapter = new HarmonyAdapter();
  }
  async connect(): Promise<IAdapter> {
    if (!(await this.isAvailable())) {
      throw new WalletNotDetectedError(this.metadata.displayName);
    }
    const client = new HarmonyExtension(this.getAgent());
    const account = await client.login();

    this.initEventController();

    const chainId = this.getAgent().network.chain_id;

    if (chainId !== 1) {
      throw new InvalidNetworkError(chainId);
    }

    const address = account.address;

    this.adapter.setAddress(address);
    this.adapter.setProvider(client);

    return this.adapter;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent() && this.getAgent().isOneWallet;
  }

  protected getAgent(): any {
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
}
