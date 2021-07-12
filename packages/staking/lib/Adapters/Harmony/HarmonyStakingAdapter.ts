import { HarmonyAdapter } from "@unifiprotocol/core-sdk";
import { BaseStakingAdapter } from "../BaseStakingAdapter";
import { Delegate } from "@harmony-js/staking";

/**
 * No es un RPC method, es un broadcasted message
 */

export class HarmonyStakingAdapter extends BaseStakingAdapter<HarmonyAdapter> {
  constructor(adapter: HarmonyAdapter) {
    super(adapter);
  }
  freeze(): Promise<void> {
    throw new Error("Not needed.");
  }
  unfreeze(): Promise<void> {
    throw new Error("Not needed.");
  }
  async vote(
    delegatorAddress: string,
    validatorAddress: string,
    amount: string
  ): Promise<void> {
    // todo: validate addresses + amount
    const stake = new Delegate(
      delegatorAddress,
      validatorAddress,
      Number(amount)
    );
    //this.adapter.execute()
    console.log("vote tx message:", stake);
  }
  async unvote(
    voter: string,
    validator: string,
    amount: string
  ): Promise<void> {
    console.log(`voter ${voter} wanna give ${amount} votes to ${validator}`);
  }
  needsFreeze(): boolean {
    return false;
  }
}
