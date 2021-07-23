export enum Blockchains {
  Binance = "BSC",
  Ethereum = "ETH",
  EthereumRopsten = "ETHRopsten",
  Iotex = "IOTX",
  Tron = "TRX",
  Harmony = "Harmony",
  Polygon = "Polygon",
}

export enum OfflineConnectors {
  Cloudflare = "cloudflare",
  EtherScan = "etherscan",
  BscDataSeed = "bscdataseed",
  TronGrid = "trongrid",
  Alchemy = "alchemy",
  Harmony = "harmony",
  Polygon = "polygon",
  Iotex = "iotex",
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
  Harmony = 1666600000,
  Polygon = 137,
}

export type Connectors = OfflineConnectors | WalletConnectors;

export type ConnectorEvent = "AddressChanged" | "NetworkChanged" | "Disconnect";
