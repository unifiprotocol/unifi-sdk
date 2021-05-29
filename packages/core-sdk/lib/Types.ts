export enum Blockchains {
  Binance = 'BSC',
  Ethereum = 'ETH',
  Iotex = 'IOTX',
  Tron = 'TRX'
}

export enum OfflineConnectors {
  Cloudflare = 'cloudflare',
  Etherscan = 'etherscan',
  BscDataSeed = 'bscdataseed',
  TronGrid = 'trongrid'
}

export enum WalletConnectors {
  Metamask = 'metamask',
  MathWallet = 'mathwallet',
  TronLink = 'tronlink'
}

export enum EthChainIds {
  Eth = 1,
  Bsc = 56,
  Iotex = 4689
}

export type Connectors = OfflineConnectors | WalletConnectors
