export interface IStakingAdapter {
  vote(voter: string, validator: string, amount: string): Promise<void>;
  unvote(voter: string, validator: string, amount: string): Promise<void>;

  needsFreeze(): boolean;

  freeze(amount: string): Promise<void>;
  unfreeze(amount: string): Promise<void>;
}
