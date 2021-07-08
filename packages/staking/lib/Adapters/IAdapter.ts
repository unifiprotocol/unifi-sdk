export interface IStakingAdapter {
  vote(amount: string): Promise<void>;
  unvote(amount: string): Promise<void>;
  needsFreeze(): boolean;

  freeze(amount: string): Promise<void>;
  unfreeze(amount: string): Promise<void>;
}
