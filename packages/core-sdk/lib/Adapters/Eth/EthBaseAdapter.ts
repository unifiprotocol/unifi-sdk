import { ContractInterface, ethers, utils } from "ethers";
import {
  AdapterBalance,
  Address,
  ExecutionParams,
  ExecutionResponse,
  TransactionResult,
} from "../Types";
import { Currency } from "../../Entities/Currency";
import { BN } from "../../Utils/BigNumber";
import { nonSuccessResponse, successResponse } from "../Helpers";
import { ERC20ABI } from "./ABIs/ERC20";
import { BaseAdapter } from "../BaseAdapter";
import { Blockchains, EthChainIds } from "../../Types";
import { CannotSignUnconnectedError } from "../../Errors/CannotSignUnconnectedError";
import { ErrorSigningTransaction } from "../../Errors/ErrorSigningTransaction";

export abstract class EthBaseAdapter extends BaseAdapter<
  ContractInterface,
  ethers.providers.BaseProvider
> {
  protected etherClient: ethers.providers.BaseProvider;
  protected contracts: { [nameContract: string]: ethers.Contract } = {};
  protected stablePairs: string[] = [];
  protected lastGasLimit = "30000";
  protected readonly chainId: EthChainIds;
  protected abi: Record<string, ContractInterface> = {};

  constructor(
    blockchain: Blockchains,
    nativeToken: Currency,
    chainId: EthChainIds,
    explorerUrl: string
  ) {
    super(blockchain, nativeToken, explorerUrl);
    this.chainId = chainId;
  }

  protected get web3Provider(): ethers.providers.Web3Provider {
    return this.etherClient as ethers.providers.Web3Provider;
  }

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
      contractAddress === this.nativeToken.address
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

  async initializeToken(
    tokenAddress: Address,
    abi: ContractInterface = ERC20ABI
  ): Promise<void> {
    this.initializeContract(tokenAddress, abi);
  }

  async execute<T = any>(
    contractAddress: string,
    method: string,
    paramsRaw: ExecutionParams,
    isWrite = false
  ): Promise<ExecutionResponse<T>> {
    this.gatherExecuteStats(method, {
      contractAddress,
      paramsRaw,
    });
    const params = this.reduceParams(contractAddress, method, paramsRaw);

    // ALLOWANCE ON ETH ALWAYS RETURN MAX
    if (
      contractAddress === this.nativeToken.address &&
      ["allowance", "approve"].includes(method)
    ) {
      return successResponse({
        method,
        value: BN(2 ** 256).toFixed(),
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
        if (contractCall) {
          const value = contractCall.toString();
          return successResponse({
            value,
            method,
            params,
          });
        }
      }
      return nonSuccessResponse({ method, params });
    } catch (err) {
      return nonSuccessResponse({ method, params, err });
    }
  }

  signTransaction(tx: any): Promise<any> {
    if (!this.getAddress()) {
      throw new CannotSignUnconnectedError();
    }
    return this.web3Provider
      .getSigner()
      .signTransaction(tx)
      .catch((error) => {
        throw new ErrorSigningTransaction(error);
      });
  }

  async sendTransaction<T = any>(tx: any): Promise<ExecutionResponse<T>> {
    try {
      const { hash } = await this.etherClient.sendTransaction(tx);

      if (hash) {
        return successResponse({ hash });
      }
      return nonSuccessResponse();
    } catch (error) {
      return nonSuccessResponse({ err: error });
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

  isConnected(): boolean {
    return !!this.address;
  }

  getAddressLink(address: string): string {
    return `${this.explorerUrl}/address/${address}`;
  }
  getTokenLink(address: string): string {
    return `${this.explorerUrl}/token/${address}`;
  }
  getTxLink(hash: string | number): string {
    return `${this.explorerUrl}/tx/${hash}`;
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
