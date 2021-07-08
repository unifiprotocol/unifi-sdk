import { TrxAdapter } from "@unifiprotocol/core-sdk";
import { BaseAdapter } from "../BaseStakingAdapter";

export class TrxStakingAdapter extends BaseAdapter<TrxAdapter> {
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
