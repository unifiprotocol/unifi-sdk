import { ExecutionResponse, TronAdapter } from "@unifiprotocol/core-sdk";
import { InsufficientVotingPower } from "../../Errors";
import { BN } from "../../Utils/BigNumber";
import { BaseStakingAdapter } from "../BaseStakingAdapter";
import { VotingPower } from "../IStakingAdapter";
import { TronVPToken } from "../../VotingPowerTokens";

export enum TronResource {
  Bandwidth = "BANDWIDTH",
  Energy = "ENERGY",
}

export interface TronFreezeOptions {
  resource: TronResource;
  duration?: number;
}

export interface TronUnfreezeOptions {
  resource: TronResource;
}

const MIN_FREEZE_DURATION = 3;

export class TronStakingAdapter extends BaseStakingAdapter<TronAdapter> {
  constructor(adapter: TronAdapter) {
    super(adapter, TronVPToken);
  }
  private get tronweb() {
    return this.adapter.getProvider();
  }
  async getVotes(): Promise<Record<string, string>> {
    const voterAcc = await this.tronweb.trx.getAccount(this.address);

    if (voterAcc.votes.length === 0) {
      return {};
    }

    return voterAcc.votes.reduce(
      (votes, vote) => ({
        ...votes,
        [vote.vote_address]: this.votingPowerCurrency.toPrecision(
          vote.vote_count
        ),
      }),
      {}
    );
  }

  async getVotesGivenTo(validator: string): Promise<string> {
    const validatorHex = this.tronweb.address.toHex(validator);
    const votes = await this.getVotes();

    return votes[validatorHex] || `0`;
  }
  async getVotingPower(): Promise<VotingPower> {
    const resources = await this.tronweb.trx.getAccountResources(this.address);

    const total = `${resources.tronPowerLimit}`;
    const used = `${resources.tronPowerUsed}`;
    // not "total - used" as our policy is to override previous votes to any node
    const available = total;

    return {
      total,
      used,
      available,
      availableLocked: [],
    };
  }

  async addVotingPower(
    amount: string,
    { resource, duration = MIN_FREEZE_DURATION }: TronFreezeOptions
  ): Promise<ExecutionResponse> {
    debugger;
    const tx = await this.tronweb.transactionBuilder.freezeBalance(
      this.tronweb.toSun(amount),
      duration,
      resource,
      this.address,
      this.address
    );
    debugger;
    return this.adapter.signAndSendTransaction(tx);
  }

  async removeVotingPower(
    _amount: string,
    { resource }: TronUnfreezeOptions
  ): Promise<ExecutionResponse> {
    const tx = await this.tronweb.transactionBuilder.unfreezeBalance(
      resource,
      this.address
    );
    return this.adapter.signAndSendTransaction(tx);
  }

  async vote(validator: string, amount: string): Promise<ExecutionResponse> {
    const { available } = await this.getVotingPower();

    if (BN(amount).isGreaterThan(available)) {
      throw new InsufficientVotingPower(available, amount);
    }

    // todo: improve this temporal patch tron does not allow to vote 0
    const fixedAmount = BN(amount).isZero() ? "1" : amount;
    const fixedIntAmount = BN(fixedAmount).dp(0).toFixed();

    const tx = await this.tronweb.transactionBuilder.vote(
      { [validator]: fixedIntAmount },
      this.address,
      1
    );
    return this.adapter.signAndSendTransaction(tx);
  }

  async unvote(validator: string, amount = "0"): Promise<ExecutionResponse> {
    const currentVotes = await this.getVotesGivenTo(validator).then((v) =>
      this.votingPowerCurrency.toFactorized(v)
    );
    const remAmount = BN(currentVotes).minus(amount).toFixed();
    return this.vote(validator, remAmount);
  }

  needVotingPowerCreation(): boolean {
    return true;
  }

  getValidatorUrl(address: string): string {
    return `https://tronscan.org/#/address/${address}`;
  }
}
