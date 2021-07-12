import { ExecutionResponse, IAdapter } from "@unifiprotocol/core-sdk";
import { IStakingAdapter } from "./IStakingAdapter";

export abstract class BaseStakingAdapter<Adapter extends IAdapter>
  implements IStakingAdapter
{
  constructor(protected readonly adapter: Adapter) {}

  abstract vote(validator: string, amount: string): Promise<ExecutionResponse>;
  abstract unvote(
    validator: string,
    amount?: string
  ): Promise<ExecutionResponse>;
  abstract needsFreeze(): boolean;

  abstract freeze(amount: string, options?: any): Promise<ExecutionResponse>;
  abstract unfreeze(amount: string, options?: any): Promise<ExecutionResponse>;
}
