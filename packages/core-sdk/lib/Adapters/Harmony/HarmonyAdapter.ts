import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { ONE } from "./NativeToken";
import { HRC20ABI } from "./ABIs/HRC20";
import { Address } from "../Types";
import { ContractInterface } from "ethers";

export class HarmonyAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Harmony,
      ONE,
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

  initializeToken(
    tokenAddress: Address,
    abi: ContractInterface = HRC20ABI
  ): void {
    return super.initializeToken(tokenAddress, abi);
  }
}
