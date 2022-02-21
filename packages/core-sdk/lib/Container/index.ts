import { Container } from "inversify";
import { Blockchains, Opt } from "@unifiprotocol/utils";
import { IBlockchainConfig, IFactory } from "../Types";
import { Factory } from "../Factory";
import { IocKey } from "./IocKey";
import {
  AvalancheConfig,
  BinanceConfig,
  BinanceTesnetConfig,
  BttcConfig,
  EthereumConfig,
  EthereumRinkebyConfig,
  EthereumRopstenConfig,
  HarmonyConfig,
  IotexConfig,
  OntologyTestnetConfig,
  PolygonConfig,
  TronConfig,
  FTMConfig,
} from "../Blockchains";

const container = new Container();
container.bind(IocKey.Factory).to(Factory).inSingletonScope();
registerBlockchainConfig(AvalancheConfig);
registerBlockchainConfig(BinanceConfig);
registerBlockchainConfig(BinanceTesnetConfig);
registerBlockchainConfig(BttcConfig);
registerBlockchainConfig(EthereumConfig);
registerBlockchainConfig(EthereumRinkebyConfig);
registerBlockchainConfig(EthereumRopstenConfig);
registerBlockchainConfig(HarmonyConfig);
registerBlockchainConfig(IotexConfig);
registerBlockchainConfig(OntologyTestnetConfig);
registerBlockchainConfig(PolygonConfig);
registerBlockchainConfig(TronConfig);
registerBlockchainConfig(FTMConfig);

function registerBlockchainConfig(config: IBlockchainConfig): void {
  container
    .bind(IocKey.BlockchainConfig)
    .toConstantValue(config)
    .whenTargetNamed(config.blockchain);
}

export const getBlockchainConfig = (
  blockchain: Blockchains
): Opt<IBlockchainConfig> =>
  container.getNamed(IocKey.BlockchainConfig, blockchain);

export const getFactory = (): IFactory => container.get(IocKey.Factory);
