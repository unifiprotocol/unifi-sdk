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
} from "@root/Connectors";
import { BscDataSeedConnector } from "@root/Connectors/Offline/BscDataSeed";
import { EtherScanConnector } from "@root/Connectors/Offline/EtherScan";
import { InvalidConnectorSetup } from "@root/Errors/InvalidConnectorSetup";
import { UnknownBlockchainError } from "@root/Errors/UnknownBlockchainError";
import { UnknownConnectorError } from "@root/Errors/UnknownConnectorError";
import { isValidBlockchain, isValidConnector } from "@root/helpers";
import {
  Blockchains,
  Connectors,
  WalletConnectors,
  OfflineConnectors,
} from "@root/Types";

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

export const getBlockchainConnectors =
  (type: "wallet" | "offline") => (blockchain: Blockchains) => {
    if (!Object.values(Blockchains).includes(blockchain)) {
      throw new UnknownBlockchainError(blockchain);
    }
    if (type === "wallet") {
      return blockchainWalletConnectors[blockchain] || [];
    }

    return blockchainOfflineConnectors[blockchain] || [];
  };
export const getBlockchainWalletConnectors = getBlockchainConnectors("wallet");

export const getBlockchainOfflineConnectors =
  getBlockchainConnectors("offline");
