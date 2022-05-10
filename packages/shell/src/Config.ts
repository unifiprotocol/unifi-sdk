import { Blockchains, getBlockchainConfig } from "@unifiprotocol/core-sdk";
import { Currency } from "@unifiprotocol/utils";

export interface IConfig {
  blockchain: Blockchains;
  chainId: number;
  nativeToken: Currency;
  wrappedToken: Currency;
}

const config: IConfig[] = [
  {
    ...baseConfig(Blockchains.Binance),
  },
  {
    ...baseConfig(Blockchains.Ethereum),
  },
  {
    ...baseConfig(Blockchains.Harmony),
  },
  {
    ...baseConfig(Blockchains.Ontology),
  },
  {
    ...baseConfig(Blockchains.Polygon),
  },
  {
    ...baseConfig(Blockchains.Iotex),
  },
  {
    ...baseConfig(Blockchains.Avalanche),
  },
  {
    ...baseConfig(Blockchains.BTTC),
  },
  {
    ...baseConfig(Blockchains.FTM),
  },
  {
    ...baseConfig(Blockchains.Tron),
  },
  {
    ...baseConfig(Blockchains.EthereumRopsten),
  },
  {
    ...baseConfig(Blockchains.BinanceTestnet),
  },
  {
    ...baseConfig(Blockchains.OntologyTestnet),
  },
];

function baseConfig(
  blockchain: Blockchains
): Pick<IConfig, "blockchain" | "chainId" | "nativeToken" | "wrappedToken"> {
  const sdkConfig = getBlockchainConfig(blockchain);

  return {
    blockchain,
    chainId: sdkConfig.chainId,
    nativeToken: sdkConfig.nativeToken,
    wrappedToken: sdkConfig.wrappedToken,
  };
}
export const defaultConfig = config[0];
export default config;
