import { getFactory } from "./Container";
import { Blockchains, IBlockchainConfig } from "./Types";

export const factory = getFactory();

export const getBlockchainConfig = (
  blockchain: Blockchains
): IBlockchainConfig => factory.getBlockchainConfig(blockchain);

export const getBlockchainWalletConnectors: typeof factory.getBlockchainWalletConnectors =
  factory.getBlockchainWalletConnectors.bind(factory);

export const getBlockchainOfflineConnectors: typeof factory.getBlockchainOfflineConnectors =
  factory.getBlockchainOfflineConnectors.bind(factory);

export const getBlockchainOfflineConnector: typeof factory.getBlockchainOfflineConnector =
  factory.getBlockchainOfflineConnector.bind(factory);

export const getBlockchainConnectors: typeof factory.getBlockchainConnectors =
  factory.getBlockchainConnectors.bind(factory);

export const getBlockchainConnectorByName: typeof factory.getBlockchainConnectorByName =
  factory.getBlockchainConnectorByName.bind(factory);

export const getBlockchainConnectorByConfig: typeof factory.getBlockchainConnectorByConfig =
  factory.getBlockchainConnectorByConfig.bind(factory);

export const getBlockchainExplorer: typeof factory.getBlockchainExplorer =
  factory.getBlockchainExplorer.bind(factory);
