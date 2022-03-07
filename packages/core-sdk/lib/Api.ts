import { blockchainConfigMap } from "./Blockchains";
import {
  Blockchains,
  IBlockchainConfig,
  IConnector,
  IBlockchainExplorer,
  IConnectorFactoryParams,
} from "./Types";
import { randomItem } from "./Utils/Array";

export const getBlockchainConfig = (
  blockchain: Blockchains
): IBlockchainConfig => {
  const config = blockchainConfigMap[blockchain];
  if (config) {
    return config;
  }
  throw new Error(`Blockchain config not found for ${blockchain}`);
};

export const getBlockchainWalletConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  return getBlockchainConfig(blockchain).wallets;
};

export const getBlockchainOfflineConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  return getBlockchainConfig(blockchain).offlineConnectors;
};

export const getBlockchainOfflineConnector = (
  blockchain: Blockchains,
  _options: { random?: boolean } = {}
): IConnector => {
  const { random } = { random: false, ..._options };
  const { offlineConnectors } = getBlockchainConfig(blockchain);
  return random ? randomItem(offlineConnectors) : offlineConnectors[0];
};

export const getBlockchainConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  const config = getBlockchainConfig(blockchain);
  return [...config.wallets, ...config.offlineConnectors];
};

export const getBlockchainConnectorByName = (
  blockchain: Blockchains,
  connectorName: string
): IConnector => {
  return getBlockchainConnectors(blockchain).find(
    (connector) => connector.name === connectorName
  );
};

export const getBlockchainConnectorByConfig = (
  blockchain: Blockchains,
  { metadata, params }: IConnectorFactoryParams
): IConnector => {
  const config = getBlockchainConfig(blockchain);
  if (!config.connectorFactory) {
    throw new Error(
      `Blockchain ${blockchain} custom connector factory not supported`
    );
  }
  return config.connectorFactory(config, metadata, params);
};

export const getBlockchainExplorer = (
  blockchain: Blockchains
): IBlockchainExplorer => {
  return getBlockchainConfig(blockchain).explorer;
};
