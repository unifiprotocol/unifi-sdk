import { adapterFactory } from "@root/Adapters/adapterFactory";
import {
  blockchainOfflineConnectors,
  blockchainWalletConnectors,
} from "@root/config";
import {
  CloudflareConnector,
  IConnector,
  MathWalletConnector,
  MetamaskConnector,
  TronGridConnector,
  TronLinkConnector,
  EtherScanConnector,
  BscDataSeedConnector,
} from "@root/Connectors";

import {
  UnknownBlockchainError,
  UnknownConnectorError,
  InvalidConnectorSetup,
} from "@root/Errors";
import { isValidBlockchain, isValidConnector } from "@root/helpers";
import {
  Blockchains,
  Connectors,
  WalletConnectors,
  OfflineConnectors,
} from "@root/Types";
import { Wallet } from "./Entities/Wallet";

export const connectorFactory = (
  blockchain: Blockchains,
  connectorName: Connectors
): IConnector => {
  if (!isValidConnector(connectorName)) {
    throw new UnknownConnectorError(connectorName);
  }
  if (!isValidBlockchain(blockchain)) {
    throw new InvalidConnectorSetup(connectorName, blockchain);
  }

  const ConnectorClass = {
    [WalletConnectors.Metamask]: MetamaskConnector,
    [WalletConnectors.MathWallet]: MathWalletConnector,
    [WalletConnectors.TronLink]: TronLinkConnector,
    [OfflineConnectors.Cloudflare]: CloudflareConnector,
    [OfflineConnectors.BscDataSeed]: BscDataSeedConnector,
    [OfflineConnectors.TronGrid]: TronGridConnector,
    [OfflineConnectors.Etherscan]: EtherScanConnector,
  }[connectorName];

  const adapter = adapterFactory(blockchain);

  return new ConnectorClass(adapter, blockchain);
};

export const getBlockchainWalletConnectors = (
  blockchain: Blockchains
): Wallet[] => {
  if (!Object.values(Blockchains).includes(blockchain)) {
    throw new UnknownBlockchainError(blockchain);
  }
  return blockchainWalletConnectors[blockchain] || [];
};

export const getBlockchainOfflineConnectors = (
  blockchain: Blockchains
): OfflineConnectors[] => {
  if (!Object.values(Blockchains).includes(blockchain)) {
    throw new UnknownBlockchainError(blockchain);
  }

  return blockchainOfflineConnectors[blockchain] || [];
};
