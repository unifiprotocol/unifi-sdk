import { IAdapter } from "../../Adapters/IAdapter";
import { BaseConnector } from "../../Connectors/BaseConnector";
import { Blockchains } from "../../Types";

export abstract class OfflineConnector extends BaseConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, false);
  }

  abstract connect(): Promise<IAdapter>;
  async logout(): Promise<void> {}
}
