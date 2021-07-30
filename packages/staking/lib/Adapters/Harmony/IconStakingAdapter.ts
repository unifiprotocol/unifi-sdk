import { HarmonyAddress } from "@harmony-js/crypto";
import { numberToHex } from "@harmony-js/utils";
import { Unit } from "@harmony-js/utils";
import {
  ExecutionResponse,
  HarmonyAdapter,
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
import { toNumber } from "icon-sdk-js/build/data/Converter";
import { sha3_256 } from "js-sha3";

interface GetStakeResponse {
  stake: string;
  unstakes: Array<{
    unstake: string;
    unstakeBlockHeight: string;
    remainingBlocks: string;
  }>;
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

    return "0";
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

    /*
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
      total: stake.stake,
      used: unstake,
      availableLocked: [],
    };
  }

  async unvote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    throw new Error("not implemented");
  }

  async vote(
    validatorAddress: string,
    amount: string
  ): Promise<ExecutionResponse> {
    const hexAmount = toHex(this.votingPowerCurrency.toPrecision(amount));
    debugger;
    return this.adapter
      .getProvider()
      .jsonRpcCall(JsonRpcMethod.SendTransaction, {
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
      })
      .then((value) => {
        debugger;
        console.log("vote result", value);
        return successResponse();
      });
  }
  needVotingPowerCreation(): boolean {
    return true;
  }

  async addVotingPower(amount: string): Promise<ExecutionResponse> {
    const hexAmount = toHex(this.votingPowerCurrency.toPrecision(amount));
    const params = {
      dataType: "call",
      from: this.address,
      version: "0x3",
      stepLimit: "0x12345",
      nid: "0x1",
      data: {
        method: "setStake",
        params: {
          value: hexAmount,
        },
      },
    };

    debugger;
    return this.adapter
      .getProvider()
      .jsonRpcCall(JsonRpcMethod.SendTransaction, params)
      .then((value) => {
        debugger;
        console.log("stake result", value);
        return successResponse();
      });
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
