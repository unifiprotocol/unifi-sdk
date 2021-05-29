import { Blockchains, EthChainIds, OfflineConnectors, WalletConnectors } from '@root/Types'
import { Opt } from '@root/Utils/Typings'

export const isValidConnector = (connectorName: any) => {
  return [...Object.values(WalletConnectors), Object.values(OfflineConnectors)].includes(
    connectorName
  )
}

export const isValidBlockchain = (blockchain: any) => {
  return Object.values(Blockchains).includes(blockchain)
}

export const blockchainToEthChainId = (blockchain: Blockchains): Opt<EthChainIds> => {
  const map: Partial<Record<Blockchains, EthChainIds>> = {
    [Blockchains.Binance]: EthChainIds.Bsc,
    [Blockchains.Ethereum]: EthChainIds.Eth,
    [Blockchains.Iotex]: EthChainIds.Iotex
  }

  return map[blockchain] || undefined
}

export const hexToDec = (hex: string) => parseInt(hex, 16)
