import { WalletFactoryNotImplemented } from "../Errors";
import { Web3BaseConnector } from ".";
import {
  IBlockchainConfig,
  OfflineConnectors,
  IConnector,
  OfflineConnectorFactoryFn,
  IConnectorMetadata,
  IWeb3ConnectorParams,
} from "../Types";

export const createWeb3OfflineConnectorHelper =
  (name: OfflineConnectors, jsonRpcUrl: string) =>
  (config: IBlockchainConfig): IConnector =>
    new Web3BaseConnector(
      jsonRpcUrl,
      {
        name,
        displayName: name,
        isWallet: false,
      },
      config
    );

export const web3ConnectorFactory: OfflineConnectorFactoryFn<
  IWeb3ConnectorParams
> = (
  config: IBlockchainConfig,
  metadata: IConnectorMetadata,
  { jsonRpcUrl }
) => {
  if (metadata.isWallet) {
    throw new WalletFactoryNotImplemented(config.blockchain);
  }
  return new Web3BaseConnector(jsonRpcUrl, metadata, config);
};
