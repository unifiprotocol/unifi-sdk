import { Blockchains, OfflineConnectors, WalletConnectors } from '@root/Types'

export const blockchainWalletConnectors = Object.freeze({
  [Blockchains.Binance]: [WalletConnectors.MathWallet, WalletConnectors.Metamask],
  [Blockchains.Ethereum]: [WalletConnectors.MathWallet, WalletConnectors.Metamask],
  [Blockchains.Iotex]: [WalletConnectors.Metamask],
  [Blockchains.Tron]: [WalletConnectors.TronLink]
})

export const blockchainOfflineConnectors = Object.freeze({
  [Blockchains.Binance]: [OfflineConnectors.Cloudflare],
  [Blockchains.Ethereum]: [OfflineConnectors.Cloudflare],
  [Blockchains.Iotex]: [OfflineConnectors.Cloudflare],
  [Blockchains.Tron]: [OfflineConnectors.Cloudflare]
})
