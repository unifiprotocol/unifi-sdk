import { IAdapter } from "../../..//Adapters";
import { WalletConnector } from "../../Wallet/WalletConnector";
import { sleep } from "../../../Utils/Sleep";

export class TronLinkConnector extends WalletConnector {
  async connect(): Promise<IAdapter> {
    await sleep(500);
    const address = window.tronWeb.defaultAddress.base58 || "";
    this.adapter.setAddress(address);
    return this.adapter;
  }
}
