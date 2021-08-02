export enum Blockchains {
  Binance = "BSC",
  Ethereum = "ETH",
  EthereumRopsten = "ETHRopsten",
  Iotex = "IOTX",
  Tron = "TRX",
  Harmony = "Harmony",
  Polygon = "Polygon",
  Icon = "Icon",
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
  Icon = "icon",
}

export enum WalletConnectors {
  IconexWallet = "IconexWallet",
  HarmonyOneWallet = "HarmonyOneWallet",
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
