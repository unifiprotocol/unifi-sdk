import { IAdapter } from "../../Adapters";
import { BaseConnector } from "../BaseConnector";
import { Blockchains } from "../../Types";

export abstract class WalletConnector extends BaseConnector {
  abstract connect(): Promise<IAdapter>;

  async isAvailable(): Promise<boolean> {
    return !!this.getAgent();
  }

  protected getAgent() {
    return window.ethereum;
  }
}
