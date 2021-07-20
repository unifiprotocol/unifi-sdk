import { ExecutionResponse, HarmonyAdapter } from "@unifiprotocol/core-sdk";
import { BaseStakingAdapter } from "../BaseStakingAdapter";
import { Delegate, Undelegate } from "@harmony-js/staking";
import { VotingPower } from "../IStakingAdapter";
import { HarmonyVPToken } from "../../VotingPowerTokens";

/**
 * No es un RPC method, es un broadcasted message
 */

export class HarmonyStakingAdapter extends BaseStakingAdapter<HarmonyAdapter> {
  constructor(adapter: HarmonyAdapter) {
    super(adapter, HarmonyVPToken);
  }

  getVotesGivenTo(validator: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getVotingPower(): Promise<VotingPower> {
    throw new Error("Method not implemented.");
  }

  addVotingPower(): Promise<ExecutionResponse> {
    throw new Error("Not needed.");
  }
  removeVotingPower(): Promise<ExecutionResponse> {
    throw new Error("Not needed.");
  }

  async vote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    // todo: validate addresses + amount
    const vote = new Delegate(this.address, validatorAddress, Number(amount));
    return this.adapter.signAndSendTransaction(vote.encode());
  }
  async unvote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    // todo: get voted amount?
    const unvote = new Undelegate(
      this.address,
      validatorAddress,
      Number(amount)
    );
    return this.adapter.signAndSendTransaction(unvote.encode());
  }
  needVotingPowerCreation(): boolean {
    return false;
  }

  getValidatorUrl(address: string): string {
    return `https://staking.harmony.one/validators/mainnet/${address}`;
  }
}
