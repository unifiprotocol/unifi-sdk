import { InvalidBlockchainError } from "../Errors";
import { Blockchains } from "../Types";
import { BscAdapter } from "./Bsc/BscAdapter";
import { EthAdapter } from "./Eth/EthAdapter";
import { IAdapter } from "./IAdapter";
import { IotxAdapter } from "./Iotex/IotexAdapter";
import { TrxAdapter } from "./Trx/TrxAdapter";

export const adapterFactory = (chain: Blockchains): IAdapter => {
  const adapterClass = {
    [Blockchains.Binance]: BscAdapter,
    [Blockchains.Ethereum]: EthAdapter,
    [Blockchains.Iotex]: IotxAdapter,
    [Blockchains.Tron]: TrxAdapter,
  }[chain];

  if (!adapterClass) {
    throw new InvalidBlockchainError(chain);
  }

  const adapter = new adapterClass();
  return adapter;
};
