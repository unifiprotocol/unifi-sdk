export enum Blockchains {
  Binance = "BSC",
  Ethereum = "ETH",
  EthereumRopsten = "ETHRopsten",
  Iotex = "IOTX",
  Tron = "TRX",
}

export enum OfflineConnectors {
  Cloudflare = "cloudflare",
  EtherScan = "etherscan",
  BscDataSeed = "bscdataseed",
  TronGrid = "trongrid",
  Alchemy = "alchemy",
}

export enum WalletConnectors {
  Binance = "binance",
  Metamask = "metamask",
  MathWallet = "mathwallet",
  TronLink = "tronlink",
  TrustWallet = "trustwallet",
  OtherEthWallet = "otherwallet",
}

export enum EthChainIds {
  Eth = 1,
  EthRopsten = 3,
  Bsc = 56,
  Iotex = 4689,
}

export type Connectors = OfflineConnectors | WalletConnectors;

export type ConnectorEvent = "AddressChanged" | "NetworkChanged" | "Disconnect";
