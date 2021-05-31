import { IAdapter } from "../../Adapters";
import { BaseConnector } from "../BaseConnector";
import { Blockchains } from "../../Types";

export abstract class WalletConnector extends BaseConnector {
  constructor(adapter: IAdapter, blockchain: Blockchains) {
    super(adapter, blockchain, true);
  }

  abstract connect(): Promise<IAdapter>;

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent();
  }

  protected getAgent() {
    return window.ethereum;
  }
}
