import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { ONENativeToken } from "../../Tokens/ONENativeToken";
import { HRC20ABI } from "./ABIs/HRC20";
import { Address } from "../Types";
import { ContractInterface } from "ethers";

export class HarmonyAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Harmony,
      ONENativeToken,
      EthChainIds.Harmony,
      "https://explorer.harmony.one/#"
    );
  }

  getAddressLink(address: string): string {
    return `${this.explorerUrl}/address/${address}`;
  }
  getTokenLink(address: string): string {
    return `${this.explorerUrl}/address/${address}`;
  }
  getTxLink(hash: string | number): string {
    return `${this.explorerUrl}/tx/${hash}`;
  }

  async initializeToken(
    tokenAddress: Address,
    abi: ContractInterface = HRC20ABI
  ): Promise<void> {
    return super.initializeToken(tokenAddress, abi);
  }
}
