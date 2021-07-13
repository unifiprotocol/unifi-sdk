import { ExecutionResponse } from "@unifiprotocol/core-sdk";

export interface VotingPower {
  total: string;
  used: string;
  available: string;
  tranches: Array<Omit<VotingPower, "tranches">>;
}

export interface IStakingAdapter {
  getVotingPower(): Promise<VotingPower>;
  vote(validator: string, amount: string): Promise<ExecutionResponse>;
  unvote(validator: string, amount?: string): Promise<ExecutionResponse>;

  needsFreeze(): boolean;

  freeze(amount: string, options?: any): Promise<ExecutionResponse>;
  unfreeze(amount: string, options?: any): Promise<ExecutionResponse>;
}
