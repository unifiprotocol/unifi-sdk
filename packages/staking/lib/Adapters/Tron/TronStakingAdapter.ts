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
  async getVotes(): Promise<Record<string, string>> {
    const voterAcc = await this.adapter
      .getProvider()
      .trx.getAccount(this.address);

    if (voterAcc.votes.length === 0) {
      return {};
    }

    return voterAcc.votes.reduce(
      (votes, vote) => ({ ...votes, [vote.vote_address]: vote.vote_count }),
      {}
    );
  }
  async getVotesGivenTo(validator: string): Promise<string> {
    const validatorHex = this.adapter.getProvider().address.toHex(validator);
    const votes = await this.getVotes();

    return votes[validatorHex] || `0`;
  }
  async getVotingPower(): Promise<VotingPower> {
    const resources = await this.adapter
      .getProvider()
      .trx.getAccountResources(this.address);

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
    const tx = await this.adapter
      .getProvider()
      .transactionBuilder.freezeBalance(
        this.adapter.getProvider().toSun(amount),
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
    const tx = await this.adapter
      .getProvider()
      .transactionBuilder.unfreezeBalance(resource, this.address);
    return this.adapter.signAndSendTransaction(tx);
  }

  async vote(validator: string, amount: string): Promise<ExecutionResponse> {
    const { available } = await this.getVotingPower();
    if (BN(amount).isGreaterThan(available)) {
      throw new InsufficientVotingPower(available, amount);
    }
    const tx = await this.adapter
      .getProvider()
      .transactionBuilder.vote({ [validator]: amount }, this.address, 1);
    return this.adapter.signAndSendTransaction(tx);
  }

  unvote(validator: string, amount = "0"): Promise<ExecutionResponse> {
    return this.vote(validator, amount);
  }
  needsFreeze(): boolean {
    return true;
  }
}
