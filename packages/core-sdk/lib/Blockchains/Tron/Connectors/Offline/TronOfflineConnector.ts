import {
  IConnectorAdapters,
  IBlockchainConfig,
  IConnectorMetadata,
} from "../../../../Types";
import { BaseConnector } from "../../../../Connectors/BaseConnector";
import { TronAdapter } from "../../Adapters/TronAdapter";
import { MulticallBaseAdapter } from "../../../../Adapters/Multicall/MulticallBaseAdapter";
import TronWeb from "tronweb";
import { ITronWebConnectorParams } from "../../Types";

export class TronOfflineConnector extends BaseConnector {
  constructor(
    config: IBlockchainConfig,
    metadata: IConnectorMetadata,
    private params: ITronWebConnectorParams
  ) {
    super(metadata, config);
  }

  protected async _forceNetwork(): Promise<void> {}

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
