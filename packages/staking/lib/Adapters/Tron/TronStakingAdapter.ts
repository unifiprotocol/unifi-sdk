import { ExecutionResponse, TronAdapter } from "@unifiprotocol/core-sdk";
import { InsufficientVotingPower } from "../../Errors";
import { BN } from "../../Utils/BigNumber";
import { BaseStakingAdapter } from "../BaseStakingAdapter";
import { VotingPower } from "../IStakingAdapter";

export enum TronResource {
  Bandwidth = "BANDWIDTH",
  Energy = "ENERGY",
}

interface TronFreezeOptions {
  resource: TronResource;
  duration?: number;
}

interface TronUnfreezeOptions {
  resource: TronResource;
}

const MIN_FREEZE_DURATION = 3;

export class TronStakingAdapter extends BaseStakingAdapter<TronAdapter> {
  private get tronweb() {
    return this.adapter.getProvider();
  }
  async getVotes(): Promise<Record<string, string>> {
    const voterAcc = await this.tronweb.trx.getAccount(this.address);

    if (voterAcc.votes.length === 0) {
      return {};
    }

    return voterAcc.votes.reduce(
      (votes, vote) => ({ ...votes, [vote.vote_address]: vote.vote_count }),
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
    const available = `${resources.tronPowerLimit - resources.tronPowerUsed}`;

    return {
      total,
      used,
      available,
    };
  }

  async freeze(
    amount: string,
    { resource, duration = MIN_FREEZE_DURATION }: TronFreezeOptions
  ): Promise<ExecutionResponse> {
    const tx = await this.tronweb.transactionBuilder.freezeBalance(
      this.tronweb.toSun(amount),
      duration,
      resource,
      this.address,
      this.address
    );
    return this.adapter.signAndSendTransaction(tx);
  }

  async unfreeze(
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
    const { total } = await this.getVotingPower();
    // our policy is to override previous votes to any node
    if (BN(amount).isGreaterThan(total)) {
      throw new InsufficientVotingPower(total, amount);
    }

    // tron does not allow to vote 0
    const fixedAmount = BN(amount).isZero() ? "1" : amount;

    const tx = await this.tronweb.transactionBuilder.vote(
      { [validator]: fixedAmount },
      this.address,
      1
    );
    return this.adapter.signAndSendTransaction(tx);
  }

  async unvote(validator: string, amount = "0"): Promise<ExecutionResponse> {
    return this.vote(validator, BN(amount).isZero() ? "1" : amount);
  }
  needsFreeze(): boolean {
    return true;
  }
}
