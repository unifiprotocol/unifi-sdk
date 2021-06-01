import { IAdapter } from "../../..//Adapters";
import { WalletConnector } from "../../Wallet/WalletConnector";
import { sleep } from "../../../Utils/Sleep";
import { Blockchains } from "../../../Types";
import { tronLinkWalletMetadata } from "./TronLinkMetadata";

export class TronLinkConnector extends WalletConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, tronLinkWalletMetadata);
  }
  async connect(): Promise<IAdapter> {
    await sleep(500);
    const address = window.tronWeb.defaultAddress.base58 || "";
    this.adapter.setAddress(address);
    return this.adapter;
  }
}
