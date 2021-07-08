import { Blockchains, InvalidBlockchainError } from "@unifiprotocol/core-sdk";
import { Constructor } from "../Utils/Typings";
import { IStakingAdapter } from "./IAdapter";
import { TrxStakingAdapter } from "./Trx/TrxStakingAdapter";

const adapterClassMap: Partial<
  Record<Blockchains, Constructor<IStakingAdapter>>
> = {
  [Blockchains.Tron]: TrxStakingAdapter,
};

export const stakingAdapterFactory = (chain: Blockchains): IStakingAdapter => {
  const adapterClass = adapterClassMap[chain];

  if (!adapterClass) {
    throw new InvalidBlockchainError(chain);
  }

  return new adapterClass();
};
