import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { EthChainIds } from "../../Types";
import { Address } from "../Types";
import { ContractInterface, ethers } from "ethers";
import { XRC20ABI } from "./ABIs/XRC20ABI";
import { Iotex } from "./NativeToken";

export class IotxAdapter extends EthBaseAdapter {
  constructor() {
    super(Iotex, EthChainIds.Iotex, "https://iotexscan.io");
  }

  getEthereumAgent() {
    return window.ethereum;
  }

  supportsMulticall() {
    return false;
  }

  protected getDefaultProvider() {
    return new ethers.providers.JsonRpcProvider(
      "https://babel-api.mainnet.iotex.io/",
      this.chainId
    );
  }

  getTxLink(hash: string) {
    return `${this.explorerUrl}/action/${hash}`;
  }

  async initializeToken(
    tokenAddress: Address,
    abi: ContractInterface = XRC20ABI
  ) {
    this.initializeContract(tokenAddress, abi);
  }
}
