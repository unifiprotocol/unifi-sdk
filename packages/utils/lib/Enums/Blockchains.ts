export enum Blockchains {
  Binance = "Binance",
  Ethereum = "Ethereum",
  EthereumRopsten = "Ropsten",
  EthereumGoerli = "Goerli",
  EthereumRinkeby = "Rinkeby",
  BinanceTestnet = "BinanceTestnet",
  Iotex = "Iotex",
  Tron = "Tron",
  Harmony = "Harmony",
  Polygon = "Polygon",
  Avalanche = "Avalanche",
  BTTC = "BTTC",
  FTM = "FTM",
  OntologyTestnet = "OntologyTestnet",
  Ontology = "Ontology",
}

export const VernacularBlockchains: { [B in Blockchains]?: string } = {
  [Blockchains.Binance]: "BNB Chain",
  [Blockchains.BinanceTestnet]: "BNB Chain Testnet",
  [Blockchains.Ethereum]: "Ethereum",
  [Blockchains.EthereumRopsten]: "Ropsten",
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
