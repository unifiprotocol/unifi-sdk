import {
  IConnectorAdapters,
  IBlockchainConfig,
  IConnectorMetadata,
} from "../../../../Types";
import { BaseConnector } from "../../../../Connectors/BaseConnector";
import { TronAdapter } from "../../Adapters/TronAdapter";

import { MulticallBaseAdapter } from "../../../../Adapters/Multicall/MulticallBaseAdapter";
import TronWeb from "tronweb";

export interface TronOfflineConnectorParams {
  fullHost: string;
  apiKey?: string;
  headers?: Record<string, string>;
}
export class TronOfflineConnector extends BaseConnector {
  constructor(
    private params: TronOfflineConnectorParams,
    metadata: IConnectorMetadata,
    config: IBlockchainConfig
  ) {
    super(metadata, config);
  }

  async _connect(): Promise<IConnectorAdapters> {
    const adapter = new TronAdapter(this.config);
    const provider = new TronWeb({
      fullHost: this.params.fullHost,
      apiKey: this.params.apiKey,
      headers: this.params.headers,
    });
    provider.setAddress("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
    adapter.setProvider(provider);
    const multicall = new MulticallBaseAdapter(adapter);
    return { adapter, multicall };
  }
}
