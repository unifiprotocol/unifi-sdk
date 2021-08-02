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
  IotexConnector,
  PolygonConnector,
  TronGridConnector,
} from "./Offline";
import { AlchemyConnector } from "./Offline/Alchemy";
import { HarmonyConnector } from "./Offline/Harmony";
import { IconConnector } from "./Offline/Icon";
import {
  MathWalletConnector,
  MetamaskConnector,
  TronLinkConnector,
  BinanceChainWalletConnector,
  TrustWalletConnector,
  OtherEthWalletConnector,
  HarmonyOneWalletConnector,
  IconexWalletConnector,
} from "./Wallet";

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
    [WalletConnectors.OtherEthWallet]: OtherEthWalletConnector,
    [WalletConnectors.IconexWallet]: IconexWalletConnector,
    [WalletConnectors.HarmonyOneWallet]: HarmonyOneWalletConnector,
    [OfflineConnectors.Cloudflare]: CloudflareConnector,
    [OfflineConnectors.BscDataSeed]: BscDataSeedConnector,
    [OfflineConnectors.TronGrid]: TronGridConnector,
    [OfflineConnectors.EtherScan]: EtherScanConnector,
    [OfflineConnectors.Alchemy]: AlchemyConnector,
    [OfflineConnectors.Harmony]: HarmonyConnector,
    [OfflineConnectors.Polygon]: PolygonConnector,
    [OfflineConnectors.Iotex]: IotexConnector,
    [OfflineConnectors.Icon]: IconConnector,
  }[connectorName];

  return new ConnectorClass(blockchain);
};
