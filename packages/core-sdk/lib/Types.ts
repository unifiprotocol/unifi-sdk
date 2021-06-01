export enum Blockchains {
  Binance = "BSC",
  Ethereum = "ETH",
  Iotex = "IOTX",
  Tron = "TRX",
}

export enum OfflineConnectors {
  Cloudflare = "cloudflare",
  EtherScan = "etherscan",
  BscDataSeed = "bscdataseed",
  TronGrid = "trongrid",
}

export enum WalletConnectors {
  Binance = "binance",
  Metamask = "metamask",
  MathWallet = "mathwallet",
  TronLink = "tronlink",
  TrustWallet = "trustwallet",
}

export enum EthChainIds {
  Eth = 1,
  Bsc = 56,
  Iotex = 4689,
}

export type Connectors = OfflineConnectors | WalletConnectors;

export type ConnectorEvent = "AddressChanged" | "NetworkChanged" | "Disconnect";
