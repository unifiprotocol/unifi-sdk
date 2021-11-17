export enum Blockchains {
  Binance = "BSC",
  Ethereum = "ETH",
  EthereumRopsten = "ETHRopsten",
  EthereumRinkeby = "ETHRinkeby",
  BinanceTestnet = "BSCTestnet",
  Iotex = "IOTX",
  Tron = "TRX",
  Harmony = "Harmony",
  Polygon = "Polygon",

  Avalanche = "Avalanche",
}

export enum OfflineConnectors {
  Cloudflare = "cloudflare",
  EtherScan = "etherscan",
  Binance = "bscdataseed",
  BinanceTestnet = "binance-testnet",
  TronGrid = "trongrid",
  Alchemy = "alchemy",
  Harmony = "harmony",
  Polygon = "polygon",
  Iotex = "iotex",
  Avalanche = "avalanche",
}

export enum WalletConnectors {
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
  EthRinkeby = 4,
  Bsc = 56,
  BscTestnet = 97,
  Iotex = 4689,
  Harmony = 1666600000,
  Polygon = 137,
  Avalanche = 43114,
}

export type Connectors = OfflineConnectors | WalletConnectors;

export type ConnectorEvent = "AddressChanged" | "NetworkChanged" | "Disconnect";
