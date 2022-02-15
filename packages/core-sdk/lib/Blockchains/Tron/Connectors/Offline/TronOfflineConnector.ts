import {
  IConnectorAdapters,
  IBlockchainConfig,
  IConnectorMetadata,
} from "../../../../Types";
import { BaseConnector } from "../../../../Connectors/BaseConnector";
import { TronAdapter } from "../../Adapters/TronAdapter";

import { MulticallBaseAdapter } from "../../../../Adapters/Multicall/MulticallBaseAdapter";
import TronWeb from "tronweb";
import { AxiosConcurrencyHandler } from "../../../../Utils/AxiosRateLimiter";

export interface TronOfflineConnectorParams {
  fullHost: string;
  privateKey?: string;
  headers?: Record<string, string>;
  rateLimiter?: AxiosConcurrencyHandler;
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
    const { rateLimiter, ...params } = this.params;
    const provider = new TronWeb(params);
    provider.setAddress("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
    adapter.setProvider(provider);
    if (rateLimiter) {
      rateLimiter.setLimiterOn(provider.fullNode.instance);
      rateLimiter.setLimiterOn(provider.eventServer.instance);
      rateLimiter.setLimiterOn(provider.solidityNode.instance);
    }

    const multicall = new MulticallBaseAdapter(adapter);

    return { adapter, multicall };
  }
}
