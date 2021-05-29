import { ContractInterface, ethers } from "ethers";
import {
  AdapterBalance,
  Address,
  ExecutionParams,
  ExecutionResponse,
  TransactionResult,
} from "@root/Adapters/Types";
import { Currency } from "@root/Entities/Currency";
import { BN } from "@root/Utils/BigNumber";
import { nonSuccessResponse, successResponse } from "@root/Adapters/helpers";
import { ERC20ABI } from "./ABIs/ERC20";
import { BaseAdapter } from "@root/Adapters/BaseAdapter";
import { EthChainIds } from "@root/Types";

export abstract class EthBaseAdapter extends BaseAdapter {
  protected etherClient: ethers.providers.BaseProvider;
  protected contracts: { [nameContract: string]: ethers.Contract } = {};
  protected stablePairs: string[] = [];
  protected lastGasLimit: string = "30000";
  protected readonly chainId: EthChainIds;

  constructor(
    nativeToken: Currency,
    chainId: EthChainIds,
    explorerUrl: string
  ) {
    super(nativeToken, explorerUrl);
    this.chainId = chainId;
  }

  setProvider(providerClass: ethers.providers.BaseProvider) {
    this.etherClient = providerClass;
  }
  async initializeContract(contractAddress: Address, abi: ContractInterface) {
    if (
      this.contracts[contractAddress] ||
      contractAddress === this.nativeToken.address
    ) {
      return;
    }
    this.contracts[contractAddress] = new ethers.Contract(
      contractAddress,
      abi,
      this.isConnected()
        ? (this.etherClient as ethers.providers.Web3Provider).getSigner()
        : this.etherClient
    );
  }

  async initializeToken(
    tokenAddress: Address,
    abi: ContractInterface = ERC20ABI
  ) {
    this.initializeContract(tokenAddress, abi);
  }

  async execute<T = any>(
    contractAddress: string,
    method: string,
    paramsRaw: ExecutionParams,
    isWrite = false
  ): Promise<ExecutionResponse<T>> {
    const params = this.reduceParams(contractAddress, method, paramsRaw);

    // ALLOWANCE ON ETH ALWAYS RETURN MAX
    if (
      contractAddress === this.nativeToken.address &&
      ["allowance", "approve"].includes(method)
    ) {
      return successResponse({
        functionName: method,
        value: BN(2 ** 256).toFixed() as any,
        params,
      });
    }

    try {
      const contract = this.contracts[contractAddress];

      if (isWrite) {
        const gasLimit = await this.getEstimatedGasPrice(
          contract,
          method,
          params
        );

        const contractCall = await contract[method].apply(
          null,
          computeInvocationParams(params, { gasLimit })
        );

        if (contractCall && contractCall.hash) {
          return successResponse({
            value: "" as any,
            hash: contractCall.hash,
            functionName: method,
            params,
          });
        }
      } else {
        const contractCall = await contract[method].apply(
          null,
          computeInvocationParams(params)
        );
        if (contractCall) {
          const value = contractCall.toString();
          return successResponse({
            value,
            functionName: method,
            params,
          });
        }
      }
      return nonSuccessResponse({ functionName: method, params });
    } catch (err) {
      return nonSuccessResponse({ functionName: method, params, err });
    }
  }

  protected async getEstimatedGasPrice(
    contract: ethers.Contract,
    contractMethod: string,
    params: ExecutionParams
  ) {
    try {
      const gasLimit = await contract["estimateGas"][contractMethod]
        .apply(null, computeInvocationParams(params))
        .then((v: ethers.BigNumber) => v.mul(1).toHexString());
      this.lastGasLimit = gasLimit;
      return gasLimit;
    } catch (err) {
      return this.lastGasLimit
        ? "0x" +
            BN(this.lastGasLimit).multipliedBy(2).decimalPlaces(0).toString(16)
        : undefined;
    }
  }

  async getBalance(
    targetAddress: Address = this.address
  ): Promise<AdapterBalance> {
    if (!this.isConnected()) {
      return { name: this.nativeToken.name, balance: "0" };
    }
    const balanceOf = await this.etherClient.getBalance(targetAddress);

    const balance = BN(balanceOf.toString() || 0).toFixed();

    return { name: this.nativeToken.name, balance };
  }

  async waitForTransaction(
    transactionHash: string
  ): Promise<TransactionResult> {
    return this.etherClient.waitForTransaction(transactionHash).then((res) => {
      return res.status && res.status === 1 ? "SUCCESS" : "FAILED";
    });
  }

  async getBlock(
    blockTag: ethers.providers.BlockTag
  ): Promise<ethers.providers.Block> {
    return this.etherClient.getBlock(blockTag);
  }

  protected reduceParams(
    contractAddress: string,
    method: string,
    params: ExecutionParams
  ): ExecutionParams {
    let reducedParams: ExecutionParams = params;

    // STABLE PAIRS RULES
    if (this.stablePairs.includes(contractAddress)) {
      switch (method) {
        case "buy":
          reducedParams = {
            callValue: 0,
            args: [...reducedParams.args, reducedParams.callValue],
          };
          break;
        case "depositSupply":
          reducedParams = {
            callValue: 0,
            args: [reducedParams.callValue],
          };
          break;
      }
    }

    return reducedParams;
  }

  async isValidNetwork(network: string): Promise<boolean> {
    return `${this.chainId}` === network;
  }

  isConnected() {
    return !!this.address;
  }

  getAddressLink(address: string): string {
    return `${this.explorerUrl}/address/${address}`;
  }
  getTokenLink(address: string): string {
    return `${this.explorerUrl}/token/${address}`;
  }
  getTxLink(hash: any): string {
    return `${this.explorerUrl}/tx/${hash}`;
  }

  resetContracts() {
    this.contracts = {};
  }
}

function computeInvocationParams(
  params: ExecutionParams,
  gasOptions: { gasPrice?: string; gasLimit?: string } = {}
) {
  const { args, callValue } = params;
  const reducedContractParameters = [
    ...(args || []),
    { value: callValue ?? 0, ...gasOptions },
  ];
  return reducedContractParameters;
}
