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
  [Blockchains.Ethereum]: [...ethereumWallets, otherEthWalletMetadata],
  [Blockchains.EthereumRopsten]: [...ethereumWallets, otherEthWalletMetadata],
  [Blockchains.Iotex]: [metamaskWalletMetadata, otherEthWalletMetadata],
  [Blockchains.Tron]: [tronLinkWalletMetadata],
  [Blockchains.Harmony]: [metamaskWalletMetadata],
});

export const blockchainOfflineConnectors = Object.freeze({
  [Blockchains.Binance]: [cloudflareMetadata],
  [Blockchains.Harmony]: [harmonyMetadata],
  [Blockchains.Ethereum]: [cloudflareMetadata, alchemyMetadata],
  [Blockchains.EthereumRopsten]: [etherScanMetadata, alchemyMetadata],
  [Blockchains.Iotex]: [cloudflareMetadata],
  [Blockchains.Tron]: [cloudflareMetadata],
});
