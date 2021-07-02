import { EthBaseAdapter } from "../Eth/EthBaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { Address } from "../Types";
import { ContractInterface, ethers } from "ethers";
import { XRC20ABI } from "./ABIs/XRC20ABI";
import { IOTXNativeToken } from "../../Tokens/IOTXNativeToken";

export class IotxAdapter extends EthBaseAdapter {
  constructor() {
    super(
      Blockchains.Iotex,
      IOTXNativeToken,
      EthChainIds.Iotex,
      "https://iotexscan.io"
    );
  }

  getEthereumAgent() {
    return window.ethereum;
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
