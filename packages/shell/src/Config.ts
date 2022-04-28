import { Blockchains, EthChainIds } from "@unifiprotocol/core-sdk";
import { Currency } from "@unifiprotocol/utils";

export interface IConfig {
  blockchain: Blockchains;
  chainId: number;
  nativeToken: Currency;
  wrappedToken: Currency;
}

const config: IConfig[] = [
  {
    blockchain: Blockchains.Binance,
    chainId: 56,
    nativeToken: new Currency("BNB", 18, "BNB", "BNB"),
    wrappedToken: new Currency(
      "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      18,
      "WBNB",
      "WBNB"
    ),
  },
  {
    blockchain: Blockchains.Ethereum,
    chainId: 1,
    nativeToken: new Currency("ETH", 18, "ETH", "ETH"),
    wrappedToken: new Currency(
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      18,
      "WETH",
      "WETH"
    ),
  },
  {
    blockchain: Blockchains.Harmony,
    chainId: 1666600000,
    nativeToken: new Currency("ONE", 18, "ONE", "ONE"),
    wrappedToken: new Currency(
      "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a",
      18,
      "WONE",
      "WONE"
    ),
  },
  {
    blockchain: Blockchains.Ontology,
    chainId: 58,
    nativeToken: new Currency("ONG", 18, "ONG", "ONG"),
    wrappedToken: new Currency(
      "0xd8bc24cfd45452ef2c8bc7618e32330b61f2691b",
      18,
      "WONG",
      "Wrapped ONG"
    ),
  },
  {
    blockchain: Blockchains.Polygon,
    chainId: 137,
    nativeToken: new Currency("MATIC", 18, "MATIC", "MATIC"),
    wrappedToken: new Currency(
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      18,
      "WMATIC",
      "WMATIC"
    ),
  },
  {
    blockchain: Blockchains.Iotex,
    chainId: 4689,
    nativeToken: new Currency("IOTX", 18, "IOTX", "IOTX"),
    wrappedToken: new Currency(
      "0xa00744882684c3e4747faefd68d283ea44099d03",
      18,
      "WIOTX",
      "WIOTX"
    ),
  },
  {
    blockchain: Blockchains.Avalanche,
    chainId: 43114,
    nativeToken: new Currency("AVAX", 18, "AVAX", "Avalanche"),
    wrappedToken: new Currency(
      "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      18,
      "WAVAX",
      "Wrapped AVAX"
    ),
  },
  {
    blockchain: Blockchains.BTTC,
    chainId: 199,
    nativeToken: new Currency("BTT", 18, "BTT", "BitTorrent"),
    wrappedToken: new Currency(
      "0x8D193c6efa90BCFf940A98785d1Ce9D093d3DC8A",
      18,
      "WBTT",
      "Wrapped BitTorrent"
    ),
  },
  {
    blockchain: Blockchains.FTM,
    chainId: 250,
    nativeToken: new Currency("FTM", 18, "FTM", "Fantom"),
    wrappedToken: new Currency(
      "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
      18,
      "WFTM",
      "Wrapped Fantom"
    ),
  },
  {
    blockchain: Blockchains.EthereumRopsten,
    chainId: 3,
    nativeToken: new Currency("ETH", 18, "ETH", "ETH"),
    wrappedToken: new Currency(
      "0x81aD5fbAa4ec85Ca6F9C97861522D8491fB4F77F",
      18,
      "WETH",
      "WETH"
    ),
  },
  {
    blockchain: Blockchains.BinanceTestnet,
    chainId: 97,
    nativeToken: new Currency("BNB", 18, "BNB", "Binance"),
    wrappedToken: new Currency(
      "0xC578c6e2505Fd2B227A64350ABf85e7221D17c91",
      18,
      "WBNB",
      "Wrapped BNB"
    ),
  },
  {
    blockchain: Blockchains.OntologyTestnet,
    chainId: EthChainIds.OntologyTestnet,
    nativeToken: new Currency("ONG", 18, "ONG", "ONG"),
    wrappedToken: new Currency(
      "0xbAC439C9092258710239971Cf883a435F214c3E3",
      18,
      "WONG",
      "Wrapped ONG"
    ),
  },
];

export default config;
