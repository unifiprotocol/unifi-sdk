import TronWeb from "tronweb";
import { TronAdapter } from "../../../Adapters";
import { IAdapter } from "../../../Adapters/IAdapter";
import { Blockchains } from "../../../Types";
import { OfflineConnector } from "../OfflineConnector";
import { tronGridMetadata } from "./TronGridMetadata";

export class TronGridConnector extends OfflineConnector {
  constructor(blockchain: Blockchains) {
    super(blockchain, tronGridMetadata);
    this.adapter = new TronAdapter();
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
