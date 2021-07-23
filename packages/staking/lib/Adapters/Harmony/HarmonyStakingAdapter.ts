import { Harmony } from "@harmony-js/core";
import { HarmonyAddress } from "@harmony-js/crypto";

import { Directive, StakingFactory, Undelegate } from "@harmony-js/staking";
import { ChainType, Unit } from "@harmony-js/utils";
import {
  EthChainIds,
  ExecutionResponse,
  HarmonyAdapter,
  nonSuccessResponse,
} from "@unifiprotocol/core-sdk";
import { BaseStakingAdapter } from "../BaseStakingAdapter";

import { VotingPower } from "../IStakingAdapter";
import { HarmonyVPToken } from "../../VotingPowerTokens";
import { BN } from "../../Utils/BigNumber";
import { MinStakeAmount } from "../../Errors";

const MIN_STAKING_AMOUNT = 100;

export class HarmonyStakingAdapter extends BaseStakingAdapter<HarmonyAdapter> {
  private harmonyClient = new Harmony("https://api.harmony.one", {
    chainType: ChainType.Harmony,
    chainId: 1,
  });
  constructor(adapter: HarmonyAdapter) {
    super(adapter, HarmonyVPToken);
  }

  getVotesGivenTo(validator: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async getVotingPower(): Promise<VotingPower> {
    const available = await this.adapter
      .getBalance()
      .then(({ balance }) => this.votingPowerCurrency.toFactorized(balance));
    return {
      available,
      total: available,
      used: "0",
    };
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
    if (BN(amount).isLessThan(MIN_STAKING_AMOUNT)) {
      throw new MinStakeAmount(`${MIN_STAKING_AMOUNT}`, amount);
    }
    const fixedAmount = BN(amount).dp(0).toFixed();
    const delegatorAddress = this.adapter.getAddress();

    const stakingTxn = {
      type: "DELEGATE",
      txnInfo: {
        from: delegatorAddress,
        to: new HarmonyAddress(validatorAddress).bech32,
        amount: Unit.Wei(fixedAmount).toEther(),
        gasPrice: "0x61a8",
        gasLimit: "0x0927c0",
        nonce: "0x1",
        chainId: 1,
        shardID: "0",
      },
    };

    return this.adapter.signAndSendTransaction(JSON.stringify(stakingTxn));
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
