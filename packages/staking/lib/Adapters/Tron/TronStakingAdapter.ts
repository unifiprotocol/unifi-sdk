import { TrxAdapter } from "@unifiprotocol/core-sdk";
import { BaseStakingAdapter } from "../BaseStakingAdapter";

export class TronStakingAdapter extends BaseStakingAdapter<TrxAdapter> {
  freeze(amount: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unfreeze(amount: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  vote(amount: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unvote(amount: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  needsFreeze(): boolean {
    return true;
  }
}
