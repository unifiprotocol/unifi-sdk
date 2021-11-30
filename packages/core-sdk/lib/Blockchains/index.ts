import { Blockchains, IBlockchainConfig } from "../Types";
import { BinanceConfig } from "./Binance";
import { BinanceTesnetConfig } from "./BinanceTestnet";
import { EthereumConfig } from "./Ethereum";
import { HarmonyConfig } from "./Harmony";

export const blockchainConfigMap: Partial<
  Record<Blockchains, IBlockchainConfig>
> = {
  [Blockchains.Ethereum]: EthereumConfig,
  [Blockchains.Binance]: BinanceConfig,
  [Blockchains.BinanceTestnet]: BinanceTesnetConfig,
  [Blockchains.Harmony]: HarmonyConfig,
};
