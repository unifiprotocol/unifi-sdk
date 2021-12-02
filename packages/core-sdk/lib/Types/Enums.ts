export enum Blockchains {
  Binance = "Binance",
  Ethereum = "Ethereum",
  EthereumRopsten = "Ropsten",
  EthereumRinkeby = "Rinkeby",
  BinanceTestnet = "BinanceTesnet",
  Iotex = "Iotex",
  Tron = "Tron",
  Harmony = "Harmony",
  Polygon = "Polygon",
  Avalanche = "Avalanche",
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

export enum OfflineConnectors {
  Cloudflare = "cloudflare",
  EtherScan = "etherscan",
  BscDataseed = "bscdataseed",
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
  MetamaskCompatible = "metamaskCompatible",
}

export type Connectors = WalletConnectors | OfflineConnectors;

export type ConnectorEvent = "AddressChanged" | "NetworkChanged" | "Disconnect";
