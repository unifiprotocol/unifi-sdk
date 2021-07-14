import { ExecutionResponse, Currency, IAdapter } from "@unifiprotocol/core-sdk";

export interface VotingPower {
  total: string;
  used: string;
  available: string;
}

export interface IStakingAdapter<
  Adapter extends IAdapter = IAdapter,
  AddVotingPowerOpts = any,
  RemoveVotingPowerOpts = any
> {
  readonly adapter: Adapter;
  readonly votingPowerCurrency: Currency;

  getVotingPower(): Promise<VotingPower>;
  /**
   * Return the votes given to a validator node
   * @param validator address of validator node in tron format
   * @returns
   */
  getVotesGivenTo(validator: string): Promise<string>;

  vote(validator: string, amount: string): Promise<ExecutionResponse>;
  unvote(validator: string, amount?: string): Promise<ExecutionResponse>;

  needVotingPowerCreation(): boolean;

  addVotingPower(
    amount: string,
    options?: AddVotingPowerOpts
  ): Promise<ExecutionResponse>;
  removeVotingPower(
    amount: string,
    options?: RemoveVotingPowerOpts
  ): Promise<ExecutionResponse>;
}
