import { ConnectorMetadata } from "../Entities";
import { UnknownBlockchainError } from "../Errors";
import { Blockchains, OfflineConnectors, WalletConnectors } from "../Types";
import {
  blockchainOfflineConnectors,
  blockchainWalletConnectors,
} from "./Config";

export const getBlockchainWalletConnectors = (
  blockchain: Blockchains
): ConnectorMetadata[] => {
  if (!Object.values(Blockchains).includes(blockchain)) {
    throw new UnknownBlockchainError(blockchain);
  }
  return blockchainWalletConnectors[blockchain] || [];
};

export const getBlockchainOfflineConnectors = (
  blockchain: Blockchains
): ConnectorMetadata[] => {
  if (!Object.values(Blockchains).includes(blockchain)) {
    throw new UnknownBlockchainError(blockchain);
  }

  return blockchainOfflineConnectors[blockchain] || [];
};

export const isValidBlockchain = (blockchain: Blockchains): boolean => {
  return Object.values(Blockchains).includes(blockchain);
};

export const isValidConnector = (
  connectorName: WalletConnectors | OfflineConnectors
): boolean => {
  const connectors = [
    ...Object.values(WalletConnectors),
    ...Object.values(OfflineConnectors),
  ];
  return connectors.includes(connectorName);
};
