import { adapterFactory } from "../Adapters";
import { InvalidConnectorSetup, UnknownConnectorError } from "../Errors";
import {
  Blockchains,
  Connectors,
  OfflineConnectors,
  WalletConnectors,
} from "../Types";
import { isValidBlockchain, isValidConnector } from "./Helpers";
import { IConnector } from "./IConnector";
import {
  BscDataSeedConnector,
  CloudflareConnector,
  EtherScanConnector,
  TronGridConnector,
} from "./Offline";
import {
  MathWalletConnector,
  MetamaskConnector,
  TronLinkConnector,
} from "./Wallet";
import { BinanceChainWalletConnector } from "./Wallet/Binance";
import { TrustWalletConnector } from "./Wallet/TrustWallet";

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
    [WalletConnectors.TrustWallet]: TrustWalletConnector,
    [WalletConnectors.Binance]: BinanceChainWalletConnector,
    [OfflineConnectors.Cloudflare]: CloudflareConnector,
    [OfflineConnectors.BscDataSeed]: BscDataSeedConnector,
    [OfflineConnectors.TronGrid]: TronGridConnector,
    [OfflineConnectors.EtherScan]: EtherScanConnector,
  }[connectorName];

  const adapter = adapterFactory(blockchain);

  return new ConnectorClass(adapter, blockchain);
};
