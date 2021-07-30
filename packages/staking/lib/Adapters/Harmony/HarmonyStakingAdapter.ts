import { HarmonyAddress } from "@harmony-js/crypto";
import { numberToHex } from "@harmony-js/utils";
import { Unit } from "@harmony-js/utils";
import {
  ExecutionResponse,
  HarmonyAdapter,
  nonSuccessResponse,
  successResponse,
} from "@unifiprotocol/core-sdk";
import { BaseStakingAdapter } from "../BaseStakingAdapter";

import { VotingPower } from "../IStakingAdapter";
import { HarmonyVPToken } from "../../VotingPowerTokens";
import { BN, toHex } from "../../Utils/BigNumber";
import { MinStakeAmount } from "../../Errors";
import { UnknownStakingError } from "../../Errors/UnknownStakingError";
import { DelegationsResponse } from "./Types";

const MIN_STAKING_AMOUNT = 0;

export class HarmonyStakingAdapter extends BaseStakingAdapter<HarmonyAdapter> {
  constructor(adapter: HarmonyAdapter) {
    super(adapter, HarmonyVPToken);
  }
  protected async fetchDelegations(): Promise<DelegationsResponse> {
    if (!this.adapter.isConnected()) {
      return [];
    }
    return fetch(
      `https://api.stake.hmny.io/networks/mainnet/delegations/${this.adapter.oneAddress}`
    )
      .then((res) => res.json())
      .then((list: DelegationsResponse) =>
        list.map((delegation) => {
          return {
            ...delegation,
            delegator_address: toHexAddress(delegation.delegator_address),
            validator_address: toHexAddress(delegation.validator_address),
            Undelegations: delegation.Undelegations.map((v) => ({
              ...v,
            })),
            amount: delegation.amount,
          };
        })
      );
  }
  async getVotesGivenTo(validatorAddress: string): Promise<string> {
    if (!this.adapter.isConnected()) {
      return "0";
    }
    console.log("geting votes given to ", validatorAddress);

    const oneValidatorAddress = toOneAddress(validatorAddress).toLowerCase();
    const delegations = await this.fetchDelegations();
    const delegationsToNode = delegations.find(
      (delegation) =>
        toOneAddress(delegation.validator_address).toLowerCase() ===
        oneValidatorAddress
    );
    if (delegationsToNode) {
      return BN(delegationsToNode.amount).toFixed();
    }
    return "0";
  }

  async getVotingPower(): Promise<VotingPower> {
    if (!this.adapter.isConnected()) {
      return {
        available: "0",
        total: "0",
        used: "0",
        availableLocked: [],
      };
    }
    const [available, delegations] = await Promise.all([
      this.adapter.getBalance().then(({ balance }) => balance),
      this.fetchDelegations(),
    ]);

    const availableLocked = delegations.reduce((list, delegation) => {
      const items: VotingPower["availableLocked"][0][] =
        delegation.Undelegations.map((v) => ({
          amount: BN(v.Amount).toFixed(),
          availableAt: `${v.Epoch}`,
          lockedAt: delegation.validator_address,
        }));
      return [...list, ...items];
    }, []);

    return {
      available,
      total: available,
      used: "0",
      availableLocked,
    };
  }

  protected async stakingAction(
    action: "delegate" | "undelegate",
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    if (BN(amount).isLessThan(MIN_STAKING_AMOUNT)) {
      throw new MinStakeAmount(`${MIN_STAKING_AMOUNT}`, amount);
    }

    const fixedAmount = toHex(this.votingPowerCurrency.toPrecision(amount));

    const delegatorAddress = new HarmonyAddress(this.adapter.getAddress())
      .checksum;

    //const tx = new StakingFactory(this.adapter.harmonyClient.messenger)
    const tx = this.adapter.harmonyClient.stakings[action]({
      delegatorAddress,
      validatorAddress: new HarmonyAddress(validatorAddress).checksum,
      amount: fixedAmount as any,
    })
      .setTxParams({
        gasLimit: 25000,
        gasPrice: numberToHex(new Unit("1").asGwei().toWei()),
        chainId: this.adapter.getProvider().network.chain_id,
        nonce: 0,
        signature: undefined,
      })
      .build();

    tx.setFromAddress(delegatorAddress);

    const signedTx = await this.adapter
      .getProvider()
      .signTransaction(tx as any, true, "rlp", "latest");

    return signedTx
      .sendTransaction()
      .then(([tx, rejectReason]) => {
        if (tx.txStatus === "REJECTED") {
          if (rejectReason.includes("failed:minimum delegation amount")) {
            throw new MinStakeAmount("100", amount);
          } else {
            throw new UnknownStakingError(rejectReason);
          }
        }

        return successResponse({
          method: "stake",
          params: { delegatorAddress, validatorAddress, amount },
          hash: tx.id,
        });
      })
      .catch((err) =>
        nonSuccessResponse({
          method: "stake",
          params: { delegatorAddress, validatorAddress, amount },
          err,
        })
      );
  }
  async unvote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    return this.stakingAction("undelegate", validatorAddress, amount);
  }

  async vote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    return this.stakingAction("delegate", validatorAddress, amount);
  }
  needVotingPowerCreation(): boolean {
    return false;
  }

  getValidatorUrl(address: string): string {
    return `https://staking.harmony.one/validators/mainnet/${address}`;
  }
}

function toOneAddress(address: string): string {
  return new HarmonyAddress(address).bech32;
}
function toHexAddress(address: string): string {
  return new HarmonyAddress(address).basicHex;
}
