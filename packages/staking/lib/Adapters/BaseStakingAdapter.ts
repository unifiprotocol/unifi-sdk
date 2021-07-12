import { IAdapter } from "@unifiprotocol/core-sdk";
import { IStakingAdapter } from "./IStakingAdapter";

export abstract class BaseStakingAdapter<Adapter extends IAdapter>
  implements IStakingAdapter
{
  constructor(protected readonly adapter: Adapter) {}

  abstract vote(
    voter: string,
    validator: string,
    amount: string
  ): Promise<void>;
  abstract unvote(
    voter: string,
    validator: string,
    amount: string
  ): Promise<void>;

  abstract needsFreeze(): boolean;

  abstract freeze(amount: string): Promise<void>;
  abstract unfreeze(amount: string): Promise<void>;
}
