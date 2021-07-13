import { ExecutionResponse } from "@unifiprotocol/core-sdk";

export interface VotingPower {
  total: string;
  used: string;
  available: string;
}

export interface IStakingAdapter {
  getVotingPower(): Promise<VotingPower>;
  getVotesGivenTo(validator: string): Promise<string>;

  vote(validator: string, amount: string): Promise<ExecutionResponse>;
  unvote(validator: string, amount?: string): Promise<ExecutionResponse>;

  needsFreeze(): boolean;

  freeze(amount: string, options?: any): Promise<ExecutionResponse>;
  unfreeze(amount: string, options?: any): Promise<ExecutionResponse>;
}
