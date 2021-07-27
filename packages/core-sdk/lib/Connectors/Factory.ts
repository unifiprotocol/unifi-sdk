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
import {
  MathWalletConnector,
  MetamaskConnector,
  TronLinkConnector,
  BinanceChainWalletConnector,
  TrustWalletConnector,
  OtherEthWalletConnector,
} from "./Wallet";
import { HarmonyOneWalletConnector } from "./Wallet/HarmonyOneWallet";

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
    [WalletConnectors.HarmonyOneWallet]: HarmonyOneWalletConnector,
    [OfflineConnectors.Cloudflare]: CloudflareConnector,
    [OfflineConnectors.BscDataSeed]: BscDataSeedConnector,
    [OfflineConnectors.TronGrid]: TronGridConnector,
    [OfflineConnectors.EtherScan]: EtherScanConnector,
    [OfflineConnectors.Alchemy]: AlchemyConnector,
    [OfflineConnectors.Harmony]: HarmonyConnector,
    [OfflineConnectors.Polygon]: PolygonConnector,
    [OfflineConnectors.Iotex]: IotexConnector,
  }[connectorName];

  return new ConnectorClass(blockchain);
};
