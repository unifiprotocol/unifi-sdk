import { InvalidBlockchainError } from "../Errors";
import { Blockchains } from "../Types";
import { BscAdapter } from "./Bsc/BscAdapter";
import { EthAdapter } from "./Eth/EthAdapter";
import { EthRopstenAdapter } from "./Eth/EthRopstenAdapter";
import { HarmonyAdapter } from "./Harmony/HarmonyAdapter";
import { IAdapter } from "./IAdapter";
import { IotxAdapter } from "./Iotex/IotexAdapter";
import { TrxAdapter } from "./Trx/TrxAdapter";

export const adapterFactory = (chain: Blockchains): IAdapter => {
  const adapterClass = {
    [Blockchains.Binance]: BscAdapter,
    [Blockchains.Ethereum]: EthAdapter,
    [Blockchains.EthereumRopsten]: EthRopstenAdapter,
    [Blockchains.Iotex]: IotxAdapter,
    [Blockchains.Tron]: TrxAdapter,
    [Blockchains.Harmony]: HarmonyAdapter,
  }[chain];

  if (!adapterClass) {
    throw new InvalidBlockchainError(chain);
  }

  return new adapterClass();
};
