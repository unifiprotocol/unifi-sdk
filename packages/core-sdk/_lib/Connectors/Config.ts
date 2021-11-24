import { Blockchains } from "../Types";
import { mathWalletMetadata } from "./Wallet/Mathwallet/MathwalletMetadata";
import { metamaskWalletMetadata } from "./Wallet/Metamask/MetamaskMetadata";
import { tronLinkWalletMetadata } from "./Wallet/TronLink/TronLinkMetadata";
import { cloudflareMetadata } from "./Offline/Cloudflare/CloudflareMetadata";
import { trustWalletMetadata } from "./Wallet/TrustWallet/TrustWalletMetadata";
import { binanceWalletMetadata } from "./Wallet/Binance/BinanceMetadata";
import { otherEthWalletMetadata } from "./Wallet/OtherEthWallet/OtherEthWalletMetadata";
import { etherScanMetadata } from "./Offline/EtherScan/EtherScanMetadata";
import { alchemyMetadata } from "./Offline/Alchemy/AlchemyMetadata";
import { harmonyMetadata } from "./Offline/Harmony/HarmonyMetadata";
import { tronGridMetadata } from "./Offline/TronGrid/TronGridMetadata";
import { polygonMetadata } from "./Offline/Polygon/PolygonMetadata";
import { iotexMetadata } from "./Offline/Iotex/IotexMetadata";
import { harmonyOneWalletMetadata } from "./Wallet/HarmonyOneWallet/HarmonyOneWalletMetadata";
import { binanceMetadata } from "./Offline/Binance/BinanceMetadata";
import { binanceTestnetMetadata } from "./Offline/Binance/BinanceTestnetMetadata";
import { avalancheMetadata } from "./Offline/Avalanche/AvalancheMetadata";

const ethereumWallets = [
  mathWalletMetadata,
  metamaskWalletMetadata,
  trustWalletMetadata,
];

export const blockchainWalletConnectors = Object.freeze({
  [Blockchains.Binance]: [
    ...ethereumWallets,
    binanceWalletMetadata,
    otherEthWalletMetadata,
  ],
  [Blockchains.BinanceTestnet]: [...ethereumWallets, otherEthWalletMetadata],
  [Blockchains.Ethereum]: [...ethereumWallets, otherEthWalletMetadata],
  [Blockchains.EthereumRopsten]: [...ethereumWallets, otherEthWalletMetadata],
  [Blockchains.EthereumRinkeby]: [...ethereumWallets, otherEthWalletMetadata],
  [Blockchains.Iotex]: [metamaskWalletMetadata, otherEthWalletMetadata],
  [Blockchains.Tron]: [tronLinkWalletMetadata],
  [Blockchains.Harmony]: [
    metamaskWalletMetadata,
    harmonyOneWalletMetadata,
    mathWalletMetadata,
  ],
  [Blockchains.Polygon]: [metamaskWalletMetadata],
  [Blockchains.Avalanche]: [metamaskWalletMetadata, otherEthWalletMetadata],
});

export const blockchainOfflineConnectors = Object.freeze({
  [Blockchains.Binance]: [binanceMetadata],
  [Blockchains.BinanceTestnet]: [binanceTestnetMetadata],
  [Blockchains.Harmony]: [harmonyMetadata],
  [Blockchains.Ethereum]: [cloudflareMetadata, alchemyMetadata],
  [Blockchains.EthereumRopsten]: [etherScanMetadata, alchemyMetadata],
  [Blockchains.EthereumRinkeby]: [etherScanMetadata, alchemyMetadata],
  [Blockchains.Iotex]: [iotexMetadata],
  [Blockchains.Tron]: [tronGridMetadata],
  [Blockchains.Polygon]: [polygonMetadata],
  [Blockchains.Avalanche]: [avalancheMetadata],
});
