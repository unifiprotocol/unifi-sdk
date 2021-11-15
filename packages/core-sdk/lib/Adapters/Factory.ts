import { Web3NotSupportedError } from "../Errors";
import { Blockchains } from "../Types";
import { Constructor } from "../Utils/Typings";
import { AvalancheAdapter } from "./Avalanche/AvalancheAdapter";
import { BscAdapter } from "./Bsc/BscAdapter";
import { BscTestnetAdapter } from "./Bsc/BscTestnetAdapter";
import { EthAdapter } from "./Eth/EthAdapter";
import { EthRopstenAdapter } from "./Eth/EthRopstenAdapter";
import { HarmonyWeb3Adapter } from "./Harmony/HarmonyWeb3Adapter";
import { IAdapter } from "./IAdapter";
import { IotexAdapter } from "./Iotex/IotexAdapter";
import { PolygonAdapter } from "./Polygon/PolygonAdapter";
import { TronAdapter } from "./Tron/TronAdapter";

export const web3AdapterFactory = (blockchain: Blockchains): IAdapter => {
  const adapterClassMap: Partial<Record<Blockchains, Constructor<IAdapter>>> = {
    [Blockchains.Binance]: BscAdapter,
    [Blockchains.BinanceTestnet]: BscTestnetAdapter,
    [Blockchains.Ethereum]: EthAdapter,
    [Blockchains.EthereumRopsten]: EthRopstenAdapter,
    [Blockchains.Iotex]: IotexAdapter,
    [Blockchains.Tron]: TronAdapter,
    [Blockchains.Polygon]: PolygonAdapter,
    [Blockchains.Harmony]: HarmonyWeb3Adapter,
    [Blockchains.Avalanche]: AvalancheAdapter,
  };

  const adapterClass = adapterClassMap[blockchain];

  if (!adapterClass) {
    throw new Web3NotSupportedError(blockchain);
  }
  return new adapterClass();
};
