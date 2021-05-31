import { IAdapter } from "../../../Adapters/IAdapter";
import { OfflineConnector } from "../OfflineConnector";

export class TronGridConnector extends OfflineConnector {
  async connect(): Promise<IAdapter> {
    return this.adapter;
  }
}
