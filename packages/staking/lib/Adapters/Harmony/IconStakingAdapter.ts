import {
  ExecutionResponse,
  nonSuccessResponse,
  successResponse,
  IconexWalletApi,
  IconexAdapter,
} from "@unifiprotocol/core-sdk";
import { BaseStakingAdapter } from "../BaseStakingAdapter";
import IconService from "icon-sdk-js";
import { VotingPower } from "../IStakingAdapter";
import { IconVPToken } from "../../VotingPowerTokens";
import { BN, toHex } from "../../Utils/BigNumber";

interface GetStakeResponse {
  stake: string;
  unstakes: Array<{
    unstake: string;
    unstakeBlockHeight: string;
    remainingBlocks: string;
  }>;
}

interface GetDelegationResponse {
  delegations: Array<{
    address: string;
    value: string;
  }>;
  totalDelegated: string;
  votingPower: string;
}

const JsonRpcMethod = IconexWalletApi.enums.JsonRpcMethod;

export class IconStakingAdapter extends BaseStakingAdapter<IconexAdapter> {
  private srv = new IconService(
    new IconService.HttpProvider("https://ctz.solidwallet.io/api/v3")
  );
  constructor(adapter: IconexAdapter) {
    super(adapter, IconVPToken);
  }

  async getVotesGivenTo(validatorAddress: string): Promise<string> {
    if (!this.adapter.isConnected()) {
      return "0";
    }

    return this.adapter
      .getProvider()
      .jsonRpcCall<any, GetDelegationResponse>(JsonRpcMethod.Call, {
        to: "cx0000000000000000000000000000000000000000",
        from: this.address,
        dataType: "call",
        data: {
          method: "getDelegation",
          params: {
            address: this.address,
          },
        },
      })
      .then((res) => {
        const delegation = res.result.delegations.find(
          (n) => n.address === validatorAddress
        );
        return delegation ? `${parseInt(delegation.value, 16)}` : "0";
      });
  }

  protected getStake(): Promise<GetStakeResponse> {
    const reqParams = {
      to: "cx0000000000000000000000000000000000000000",
      from: this.address,
      dataType: "call",
      data: {
        method: "getStake",
        params: {
          address: this.address,
        },
      },
    };

    return this.adapter
      .getProvider()
      .jsonRpcCall<any, GetStakeResponse>(JsonRpcMethod.Call, reqParams)
      .then((res) => {
        res.result.stake = `${parseInt(res.result.stake, 16)}`;
        res.result.unstakes = res.result.unstakes || [];
        res.result.unstakes = res.result.unstakes.map((unstake) => ({
          remainingBlocks: `${parseInt(unstake.remainingBlocks, 16)}`,
          unstakeBlockHeight: `${parseInt(unstake.unstakeBlockHeight, 16)}`,
          unstake: `${parseInt(unstake.unstake, 16)}`,
        }));
        return res.result;
      });
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

    const stake = await this.getStake();

    const available = stake.stake;

    /* this code is the ICX being unstaked, might be useful 
    const availableLocked = stake.unstakes.map(u=>({
      amount: u.unstake,
    availableAt: u.unstakeBlockHeight,
    lockedAt: ''
    }))
    */
    const unstake = stake.unstakes
      .reduce((total, u) => total.plus(u.unstake), BN("0"))
      .toFixed();

    return {
      available,
      total: available,
      used: unstake,
      availableLocked: [],
    };
  }

  async unvote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    const currentAmount = await this.getVotesGivenTo(validatorAddress).then(
      (votes) => this.votingPowerCurrency.toFactorized(votes)
    );
    const remAmount = BN(currentAmount).minus(amount).toFixed();
    return this.vote(validatorAddress, remAmount);
  }

  async vote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    const hexAmount = toHex(this.votingPowerCurrency.toPrecision(amount));
    const params = {
      dataType: "call",
      from: this.address,
      to: "cx0000000000000000000000000000000000000000",
      version: "0x3",
      nid: "0x1",
      timestamp: timestamp(),
      data: {
        method: "setDelegation",
        params: {
          delegations: [
            {
              address: validatorAddress,
              value: hexAmount,
            },
          ],
        },
      },
    };

    const stepLimit = await this.adapter
      .getProvider()
      .estimateStepLimit(params);

    return this.adapter
      .getProvider()
      .jsonRpcCall<any, string>(JsonRpcMethod.SendTransaction, {
        ...params,
        stepLimit,
      })
      .then((res) => successResponse({ hash: res.result }))
      .catch(nonSuccessResFromError);
  }
  needVotingPowerCreation(): boolean {
    return true;
  }

  async addVotingPower(amount: string): Promise<ExecutionResponse> {
    const hexAmount = toHex(this.votingPowerCurrency.toPrecision(amount));
    const params = {
      dataType: "call",
      from: this.address,
      to: "cx0000000000000000000000000000000000000000",
      version: "0x3",
      nid: "0x1",
      timestamp: timestamp(),
      data: {
        method: "setStake",
        params: {
          value: hexAmount,
        },
      },
    };

    const stepLimit = await this.adapter.getProvider().estimateStepLimit({
      from: "hx10575a9a1b6b9516c5254abbef82f1924f01ecac",
      to: "cx0000000000000000000000000000000000000000",
      version: "0x3",
      nid: "0x1",
      timestamp: timestamp(),
      dataType: "call",
      data: {
        method: "setStake",
        params: {
          value: "0x13c144060cbd1c000",
        },
      },
    });

    return this.adapter
      .getProvider()
      .jsonRpcCall<any, string>(JsonRpcMethod.SendTransaction, {
        ...params,
        stepLimit,
      })
      .then((res) => successResponse({ hash: res.result }));
  }
  async removeVotingPower(amount: string): Promise<ExecutionResponse> {
    const stake = await this.getStake();
    const remainingAmount = BN(stake.stake).minus(amount).toFixed();
    return this.addVotingPower(remainingAmount);
  }

  getValidatorUrl(address: string): string {
    return `https://tracker.icon.foundation/address/${address}`;
  }
}

function timestamp() {
  return toHex(new Date().getTime() * 1000);
}

function nonSuccessResFromError(err: Error) {
  return nonSuccessResponse({ err });
}
