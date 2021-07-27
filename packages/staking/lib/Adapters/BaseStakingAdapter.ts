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
  abstract getValidatorUrl(address: string): string;
  abstract getVotingPower(): Promise<VotingPower>;
  abstract getVotesGivenTo(validator: string): Promise<string>;
  abstract vote(validator: string, amount: string): Promise<ExecutionResponse>;
  abstract unvote(
    validator: string,
    amount?: string
  ): Promise<ExecutionResponse>;

  needVotingPowerCreation(): boolean {
    return false;
  }

  addVotingPower(
    amount: string,
    options?: AddVotingPowerOpts
  ): Promise<ExecutionResponse> {
    throw new Error(
      `${this.adapter.blockchain} does not require previous steps to get voting power`
    );
  }
  removeVotingPower(
    amount: string,
    options?: RemoveVotingPowerOpts
  ): Promise<ExecutionResponse> {
    throw new Error(
      `${this.adapter.blockchain} does not require previous steps to get voting power`
    );
  }
}
