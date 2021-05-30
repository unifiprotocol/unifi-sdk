import { IAdapter } from "@root/Adapters/IAdapter";
import { BaseConnector } from "@root/Connectors/BaseConnector";
import { Blockchains } from "@root/Types";

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
