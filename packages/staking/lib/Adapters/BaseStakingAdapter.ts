import { IAdapter } from "@unifiprotocol/core-sdk";
import { IStakingAdapter } from "./IAdapter";

export abstract class BaseAdapter<Adapter extends IAdapter>
  implements IStakingAdapter
{
  constructor(protected readonly adapter: Adapter) {}

  abstract vote(amount: string): Promise<void>;
  abstract unvote(amount: string): Promise<void>;

  abstract freeze(amount: string): Promise<void>;
  abstract unfreeze(amount: string): Promise<void>;

  abstract needsFreeze(): boolean;
}
