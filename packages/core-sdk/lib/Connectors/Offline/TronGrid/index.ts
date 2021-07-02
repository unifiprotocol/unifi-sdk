import TronWeb from "tronweb";
import { IAdapter } from "../../../Adapters/IAdapter";
import { Blockchains } from "../../../Types";
import { OfflineConnector } from "../OfflineConnector";
import { tronGridMetadata } from "./TronGridMetadata";

export class TronGridConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, tronGridMetadata);
  }
  async connect(): Promise<IAdapter> {
    this.adapter.setProvider(
      new TronWeb({
        fullHost: "https://api.trongrid.io/",
      })
    );
    return this.adapter;
  }
}
