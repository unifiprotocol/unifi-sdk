import { IBlockchainConfig } from "../Types/IBlockchainConfig";
import { Blockchains } from "../Types/Enums";
import { AvalancheConfig } from "./Avalanche";
import { BinanceConfig } from "./Binance";
import { BinanceTestnetConfig } from "./BinanceTestnet";
import { BttcConfig } from "./BTTC";
import { EthereumConfig } from "./Ethereum";
import { EthereumRinkebyConfig } from "./EthereumRinkeby";
import { EthereumRopstenConfig } from "./EthereumRopsten";
import { HarmonyConfig } from "./Harmony";
import { IotexConfig } from "./Iotex";
import { OntologyTestnetConfig } from "./OntologyTestnet";
import { OntologyConfig } from "./Ontology";
import { PolygonConfig } from "./Polygon";
import { FTMConfig } from "./FTM";
import { TronConfig } from "./Tron";
import { EthereumGoerliConfig } from "./EthereumGoerli";

export const blockchainConfigMap: Partial<
  Record<Blockchains, IBlockchainConfig>
> = {
  [Blockchains.Ethereum]: EthereumConfig,
  [Blockchains.EthereumGoerli]: EthereumGoerliConfig,
  [Blockchains.EthereumRinkeby]: EthereumRinkebyConfig,
  [Blockchains.EthereumRopsten]: EthereumRopstenConfig,
  [Blockchains.Binance]: BinanceConfig,
  [Blockchains.BinanceTestnet]: BinanceTestnetConfig,
  [Blockchains.Harmony]: HarmonyConfig,
  [Blockchains.Avalanche]: AvalancheConfig,
  [Blockchains.Polygon]: PolygonConfig,
  [Blockchains.Iotex]: IotexConfig,
  [Blockchains.BTTC]: BttcConfig,
  [Blockchains.OntologyTestnet]: OntologyTestnetConfig,
  [Blockchains.FTM]: FTMConfig,
  [Blockchains.Tron]: TronConfig,
  [Blockchains.Ontology]: OntologyConfig,
};
