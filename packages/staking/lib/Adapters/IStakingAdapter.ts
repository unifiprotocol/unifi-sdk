import { ExecutionResponse, Currency, IAdapter } from "@unifiprotocol/core-sdk";

type PrecisionAmount = string;
type FactorizedAmount = string;
type Address = string;
export interface VotingPower {
  total: PrecisionAmount;
  used: PrecisionAmount;
  available: PrecisionAmount;
  availableLocked: Array<{
    amount: PrecisionAmount;
    availableAt: string;
    lockedAt: Address;
  }>;
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
  getVotesGivenTo(validator: Address): Promise<PrecisionAmount>;

  vote(
    validator: Address,
    amount: FactorizedAmount
  ): Promise<ExecutionResponse>;

  unvote(
    validator: Address,
    amount?: FactorizedAmount
  ): Promise<ExecutionResponse>;

  needVotingPowerCreation(): boolean;

  addVotingPower(
    amount: FactorizedAmount,
    options?: AddVotingPowerOpts
  ): Promise<ExecutionResponse>;
  removeVotingPower(
    amount: FactorizedAmount,
    options?: RemoveVotingPowerOpts
  ): Promise<ExecutionResponse>;

  getValidatorUrl(address: string): string;
}
