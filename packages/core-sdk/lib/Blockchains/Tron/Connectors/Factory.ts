import { WalletFactoryNotImplemented } from "../../../Errors";
import {
  IConnector,
  IBlockchainConfig,
  IConnectorMetadata,
} from "../../../Types";
import { AxiosConcurrencyHandler } from "../../../Utils/AxiosRateLimiter";
import { ITronWebConnectorParams } from "../Types";
import { TronOfflineConnector } from "./Offline/TronOfflineConnector";

// share rate limiter across all offline connectors to limit requests globally
const tronGridRateLimiter = new AxiosConcurrencyHandler(10, 1000);

export const createTronOfflineConnectorHelper = (
  name: string,
  tronWebParams: ITronWebConnectorParams
) => {
  return (config: IBlockchainConfig): IConnector =>
    new TronOfflineConnector(
      config,
      {
        name,
        displayName: name,
        isWallet: false,
      },
      {
        ...tronWebParams,
        rateLimiter: tronWebParams.rateLimiter || tronGridRateLimiter,
      }
    );
};

export const tronConnectorFactory = (
  config: IBlockchainConfig,
  metadata: IConnectorMetadata,
  params: ITronWebConnectorParams
): IConnector => {
  if (metadata.isWallet) {
    throw new WalletFactoryNotImplemented(config.blockchain);
  }
  params.rateLimiter = params.rateLimiter || tronGridRateLimiter;
  return new TronOfflineConnector(config, metadata, params);
};
