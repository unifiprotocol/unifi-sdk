import { BN, hexToDec } from "@unifiprotocol/utils";
import { ContractInterface, ethers, utils } from "ethers";
import {
  AdapterBalance,
  Address,
  ExecutionParams,
  ExecutionResponse,
  TransactionResult,
} from "../Types";

import { nonSuccessResponse, successResponse } from "./Helpers";
import { ERC20ABI } from "../Abis/ERC20";
import { BaseAdapter } from "./BaseAdapter";

export class Web3BaseAdapter extends BaseAdapter<
  ContractInterface,
  ethers.providers.BaseProvider
> {
  protected etherClient: ethers.providers.BaseProvider;
  protected contracts: { [nameContract: string]: ethers.Contract } = {};
  protected stablePairs: string[] = [];
  protected lastGasLimit = "30000";
  protected abi: Record<string, ContractInterface> = {};

  setProvider(providerClass: ethers.providers.BaseProvider): void {
    this.etherClient = providerClass;
  }

  getProvider(): ethers.providers.BaseProvider {
    return this.etherClient;
  }

  getContractInterface(contractAddress: string): ContractInterface {
    return this.abi[contractAddress];
  }

  async initializeContract(
    contractAddress: Address,
    abi: ContractInterface
  ): Promise<void> {
    if (
      this.contracts[contractAddress] ||
      contractAddress === this.blockchainConfig.nativeToken.address
    ) {
      return;
    }
    this.abi[contractAddress] = abi;
    this.contracts[contractAddress] = new ethers.Contract(
      contractAddress,
      abi,
      this.isConnected() ? this.web3Provider.getSigner() : this.etherClient
    );
  }

  protected get web3Provider(): ethers.providers.Web3Provider {
    return this.etherClient as ethers.providers.Web3Provider;
  }

  async initializeToken(
    tokenAddress: Address,
    abi: ContractInterface = ERC20ABI
  ): Promise<void> {
    this.initializeContract(tokenAddress, abi);
  }

  async execute<T = string>(
    contractAddress: string,
    method: string,
    paramsRaw: ExecutionParams,
    isWrite = false
  ): Promise<ExecutionResponse<T>> {
    const params = this.reduceParams(contractAddress, method, paramsRaw);

    // Allowance on native are always MAX
    if (
      contractAddress === this.blockchainConfig.nativeToken.address &&
      ["allowance", "approve"].includes(method)
    ) {
      return successResponse({
        method,
        value: BN(2).pow(256).toFixed(),
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

        const computedParams = computeInvocationParams(params, { gasLimit });

        // use callStatic to check if tx might fail before calling spending gas
        await contract.callStatic[method].apply(null, computedParams);

        const contractCall = await contract[method].apply(null, computedParams);

        if (contractCall && contractCall.hash) {
          return successResponse({
            value: "",
            hash: contractCall.hash,
            method,
            params,
          });
        }
      } else {
        const contractCall = await contract[method].apply(
          null,
          computeInvocationParams(params)
        );

        const value = Array.isArray(contractCall)
          ? contractCall.map((v) => v.toString())
          : contractCall.toString();

        return successResponse({
          value,
          method,
          params,
        });
      }
      return nonSuccessResponse({ method, params });
    } catch (err) {
      return nonSuccessResponse({ method, params, err });
    }
  }

  protected async getEstimatedGasPrice(
    contract: ethers.Contract,
    contractMethod: string,
    params: ExecutionParams
  ): Promise<string> {
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
      return { name: this.blockchainConfig.nativeToken.name, balance: "0" };
    }
    const balanceOf = await this.etherClient.getBalance(targetAddress);

    const balance = BN(balanceOf.toString() || 0).toFixed();

    return { name: this.blockchainConfig.nativeToken.name, balance };
  }

  async waitForTransaction(
    transactionHash: string
  ): Promise<TransactionResult> {
    return this.etherClient.waitForTransaction(transactionHash).then((res) => {
      return res.status && res.status === 1 ? "SUCCESS" : "FAILED";
    });
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
    return `${this.blockchainConfig.chainId}` === network;
  }

  isConnected(): boolean {
    return !!this.address;
  }

  resetContracts(): void {
    this.contracts = {};
  }

  isValidAddress(address: Address): boolean {
    try {
      return utils.isAddress(address);
    } catch (error) {
      return false;
    }
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
