import {
  IAdapter,
  Blockchains,
  InvalidBlockchainError,
} from "@unifiprotocol/core-sdk";
import { Constructor } from "../Utils/Typings";
import { HarmonyStakingAdapter } from "./Harmony/HarmonyStakingAdapter";
import { IStakingAdapter } from "./IStakingAdapter";
import { TronStakingAdapter } from "./Tron/TronStakingAdapter";

const adapterClassMap: Partial<
  Record<Blockchains, Constructor<IStakingAdapter>>
> = {
  [Blockchains.Tron]: TronStakingAdapter,
  [Blockchains.Harmony]: HarmonyStakingAdapter,
};

export const stakingAdapterFactory = (adapter: IAdapter): IStakingAdapter => {
  const adapterClass = adapterClassMap[adapter.blockchain];

  if (!adapterClass) {
    throw new InvalidBlockchainError(adapter.blockchain);
  }

  return new adapterClass(adapter);
};
