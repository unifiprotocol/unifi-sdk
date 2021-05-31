import { Blockchains } from "../Types";
import { mathWalletMetadata } from "./Wallet/Mathwallet/MathwalletMetadata";
import { metamaskWalletMetadata } from "./Wallet/Metamask/MetamaskMetadata";
import { tronLinkWalletMetadata } from "./Wallet/TronLink/TronLinkMetadata";
import { cloudflareMetadata } from "./Offline/Cloudflare/CloudflareMetadata";

export const blockchainWalletConnectors = Object.freeze({
  [Blockchains.Binance]: [mathWalletMetadata, metamaskWalletMetadata],
  [Blockchains.Ethereum]: [mathWalletMetadata, metamaskWalletMetadata],
  [Blockchains.Iotex]: [metamaskWalletMetadata],
  [Blockchains.Tron]: [tronLinkWalletMetadata],
});

export const blockchainOfflineConnectors = Object.freeze({
  [Blockchains.Binance]: [cloudflareMetadata],
  [Blockchains.Ethereum]: [cloudflareMetadata],
  [Blockchains.Iotex]: [cloudflareMetadata],
  [Blockchains.Tron]: [cloudflareMetadata],
});
