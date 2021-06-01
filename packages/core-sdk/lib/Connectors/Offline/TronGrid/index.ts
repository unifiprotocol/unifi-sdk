import { IAdapter } from "../../../Adapters/IAdapter";
import { Blockchains } from "../../../Types";
import { OfflineConnector } from "../OfflineConnector";
import { tronGridMetadata } from "./TronGridMetadata";

export class TronGridConnector extends OfflineConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, tronGridMetadata);
  }
  async connect(): Promise<IAdapter> {
    return this.adapter;
  }
}
