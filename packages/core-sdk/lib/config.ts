import { Blockchains, OfflineConnectors, WalletConnectors } from "@root/Types";
import { mathWallet } from "@root/Wallets/Mathwallet";
import { metamaskWallet } from "@root/Wallets/Metamask";
import { tronLinkWaltet } from "@root/Wallets/TronLink";

export const blockchainWalletConnectors = Object.freeze({
  [Blockchains.Binance]: [mathWallet, metamaskWallet],
  [Blockchains.Ethereum]: [mathWallet, metamaskWallet],
  [Blockchains.Iotex]: [metamaskWallet],
  [Blockchains.Tron]: [tronLinkWaltet],
});

export const blockchainOfflineConnectors = Object.freeze({
  [Blockchains.Binance]: [OfflineConnectors.Cloudflare],
  [Blockchains.Ethereum]: [OfflineConnectors.Cloudflare],
  [Blockchains.Iotex]: [OfflineConnectors.Cloudflare],
  [Blockchains.Tron]: [OfflineConnectors.Cloudflare],
});
