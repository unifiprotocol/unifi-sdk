import { Blockchains, IBlockchainConfig } from "../Types";
import { AvalancheConfig } from "./Avalanche";
import { BinanceConfig } from "./Binance";
import { BinanceTesnetConfig } from "./BinanceTestnet";
import { EthereumConfig } from "./Ethereum";
import { HarmonyConfig } from "./Harmony";
import { IotexConfig } from "./Iotex";
import { PolygonConfig } from "./Polygon";

export const blockchainConfigMap: Partial<
  Record<Blockchains, IBlockchainConfig>
> = {
  [Blockchains.Ethereum]: EthereumConfig,
  [Blockchains.Binance]: BinanceConfig,
  [Blockchains.BinanceTestnet]: BinanceTesnetConfig,
  [Blockchains.Harmony]: HarmonyConfig,
  [Blockchains.Avalanche]: AvalancheConfig,
  [Blockchains.Polygon]: PolygonConfig,
  [Blockchains.Iotex]: IotexConfig,
};
