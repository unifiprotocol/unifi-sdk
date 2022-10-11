export enum Blockchains {
  Binance = "binance",
  Ethereum = "ethereum",
  EthereumGoerli = "Goerli",
  EthereumRinkeby = "Rinkeby",
  BinanceTestnet = "bsctestnet",
  Iotex = "iotex",
  Tron = "Tron",
  Harmony = "harmony",
  Polygon = "polygon",
  Avalanche = "avalanche",
  BTTC = "bttc",
  FTM = "FTM",
  OntologyTestnet = "ontologytestnet",
  Ontology = "Ontology",
}

export const VernacularBlockchains: { [B in Blockchains]?: string } = {
  [Blockchains.Binance]: "BNB Chain",
  [Blockchains.BinanceTestnet]: "BNB Chain Testnet",
  [Blockchains.Ethereum]: "Ethereum",
  [Blockchains.EthereumRinkeby]: "Rinkeby",
  [Blockchains.Iotex]: "IoTeX",
  [Blockchains.Tron]: "Tron",
  [Blockchains.Harmony]: "Harmony",
  [Blockchains.Polygon]: "Polygon",
  [Blockchains.BTTC]: "BitTorrent",
  [Blockchains.Avalanche]: "Avalanche",
  [Blockchains.FTM]: "Fantom",
  [Blockchains.Ontology]: "Ontology EVM",
  [Blockchains.OntologyTestnet]: "Ontology EVM Testnet",
};

export const getVernacularBlockchain = (blockchain: Blockchains): string => {
  return VernacularBlockchains[blockchain] ?? blockchain;
};
