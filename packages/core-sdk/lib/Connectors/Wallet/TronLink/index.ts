import { IAdapter } from "../../..//Adapters";
import { WalletConnector } from "../../Wallet/WalletConnector";
import { sleep } from "../../../Utils/Sleep";
import { Blockchains } from "../../../Types";
import { tronLinkWalletMetadata } from "./TronLinkMetadata";
import { WalletNotDetectedError } from "../../../Errors";

export class TronLinkConnector extends WalletConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, tronLinkWalletMetadata);
  }

  protected getAgent(): any {
    return window.tronWeb;
  }

  async connect(): Promise<IAdapter> {
    return new Promise((resolve, reject) => {
      let retries = 0;
      const retry = setInterval(() => {
        if (!this.getAgent() || !this.getAgent().ready) {
          retries++;
          if (retries > 4) {
            reject(new WalletNotDetectedError(this.metadata.displayName));
          }
          return;
        }
        clearInterval(retry);
        this.adapter.setProvider(this.getAgent());
        this.adapter.setAddress(this.getAgent().defaultAddress.base58);
        resolve(this.adapter);
      }, 500);
    });
  }
}
