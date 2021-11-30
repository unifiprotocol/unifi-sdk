import { Blockchains, IBlockchainConfig, IConnector } from "../Types";
import { EthereumConfig } from "./Ethereum";

const blockchainConfigMap: Partial<Record<Blockchains, IBlockchainConfig>> = {
  [Blockchains.Ethereum]: EthereumConfig,
};

export const getBlockchainConfig = (
  blockchain: Blockchains
): IBlockchainConfig => {
  if (blockchainConfigMap[blockchain]) {
    return blockchainConfigMap[blockchain];
  }
  throw new Error("Blockchain config not found");
};

export const getBlockchainWalletConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  const config = getBlockchainConfig(blockchain);
  return config.wallets;
};

export const getBlockchainOfflineConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  const config = getBlockchainConfig(blockchain);
  return config.offlineConnectors;
};

export const getBlockchainConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  const config = getBlockchainConfig(blockchain);
  return [...config.wallets, ...config.offlineConnectors];
};
