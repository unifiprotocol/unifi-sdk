import { getFactory } from "./container";
import { Blockchains, IBlockchainConfig } from "./Types";

export const factory = getFactory();

export const getBlockchainConfig = (
  blockchain: Blockchains
): IBlockchainConfig => factory.getBlockchainConfig(blockchain);

export const getBlockchainWalletConnectors =
  factory.getBlockchainWalletConnectors.bind(factory);

export const getBlockchainOfflineConnectors =
  factory.getBlockchainOfflineConnectors.bind(factory);

export const getBlockchainOfflineConnector =
  factory.getBlockchainOfflineConnector.bind(factory);

export const getBlockchainConnectors =
  factory.getBlockchainConnectors.bind(factory);

export const getBlockchainConnectorByName =
  factory.getBlockchainConnectorByName.bind(factory);

export const getBlockchainConnectorByConfig =
  factory.getBlockchainConnectorByConfig.bind(factory);

export const getBlockchainExplorer =
  factory.getBlockchainExplorer.bind(factory);
