import { InvalidBlockchainError } from "../Errors";
import { Blockchains } from "../Types";
import { BscAdapter } from "./Bsc/BscAdapter";
import { EthAdapter } from "./Eth/EthAdapter";
import { EthRopstenAdapter } from "./Eth/EthRopstenAdapter";
import { HarmonyWeb3Adapter } from "./Harmony/HarmonyWeb3Adapter";
import { IAdapter } from "./IAdapter";
import { IotexAdapter } from "./Iotex/IotexAdapter";
import { PolygonAdapter } from "./Polygon/PolygonAdapter";
import { TronAdapter } from "./Tron/TronAdapter";

export const web3AdapterFactory = (blockchain: Blockchains): IAdapter => {
  const adapterClass = {
    [Blockchains.Binance]: BscAdapter,
    [Blockchains.Ethereum]: EthAdapter,
    [Blockchains.EthereumRopsten]: EthRopstenAdapter,
    [Blockchains.Iotex]: IotexAdapter,
    [Blockchains.Tron]: TronAdapter,
    [Blockchains.Polygon]: PolygonAdapter,
    [Blockchains.Harmony]: HarmonyWeb3Adapter,
  }[blockchain];

  if (!adapterClass) {
    throw new InvalidBlockchainError(blockchain);
  }
  return new adapterClass();
};
