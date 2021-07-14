import { ExecutionResponse, IAdapter, Currency } from "@unifiprotocol/core-sdk";
import { IStakingAdapter, VotingPower } from "./IStakingAdapter";

export abstract class BaseStakingAdapter<
  Adapter extends IAdapter,
  AddVotingPowerOpts = any,
  RemoveVotingPowerOpts = any
> implements
    IStakingAdapter<Adapter, AddVotingPowerOpts, RemoveVotingPowerOpts>
{
  constructor(
    public readonly adapter: Adapter,
    public readonly votingPowerCurrency: Currency
  ) {}

  protected get address(): string {
    return this.adapter.getAddress();
  }

  abstract getVotingPower(): Promise<VotingPower>;
  abstract getVotesGivenTo(validator: string): Promise<string>;
  abstract vote(validator: string, amount: string): Promise<ExecutionResponse>;
  abstract unvote(
    validator: string,
    amount?: string
  ): Promise<ExecutionResponse>;

  abstract needVotingPowerCreation(): boolean;

  abstract addVotingPower(
    amount: string,
    options?: AddVotingPowerOpts
  ): Promise<ExecutionResponse>;
  abstract removeVotingPower(
    amount: string,
    options?: RemoveVotingPowerOpts
  ): Promise<ExecutionResponse>;
}
