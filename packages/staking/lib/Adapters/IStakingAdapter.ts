import { ExecutionResponse } from "@unifiprotocol/core-sdk";

export interface IStakingAdapter {
  vote(validator: string, amount: string): Promise<ExecutionResponse>;
  unvote(validator: string, amount?: string): Promise<ExecutionResponse>;

  needsFreeze(): boolean;

  freeze(amount: string, options?: any): Promise<ExecutionResponse>;
  unfreeze(amount: string, options?: any): Promise<ExecutionResponse>;
}
