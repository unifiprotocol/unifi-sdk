import { BN } from "@unifiprotocol/utils";
import { ContractInterface, ethers, utils } from "ethers";
import {
  AdapterBalance,
  Address,
  BlockTag,
  ExecutionParams,
  ExecutionResponse,
  IBlock,
  IBlockWithTransactions,
  ITransactionWithLogs,
  ITransactionLog,
  TransactionResult,
  GetDecodedTransactionWithLogsOptions,
  GetTransactionsFromEventsOptions,
  TransactionStatus,
} from "../Types";

import { nonSuccessResponse, successResponse } from "./Helpers";
import { ERC20ABI } from "../Abis";
import { BaseAdapter } from "./BaseAdapter";
import { LogDecoder, TxDecoder } from "@maticnetwork/eth-decoder";
import { onlyUnique } from "../Utils/Array";
import { AdapterNotConnectedError, BlockNotFoundError } from "../Errors";

export class Web3BaseAdapter extends BaseAdapter<
  ContractInterface,
  ethers.providers.BaseProvider
> {
  signMessage(message: string): Promise<string> {
    if (this.isConnected()) {
      return this.web3Provider.getSigner().signMessage(message);
    }
    throw new AdapterNotConnectedError();
  }

  async getBlockWithTxs(height: BlockTag): Promise<IBlockWithTransactions> {
    const blockWithTxs = await this.getProvider().getBlockWithTransactions(
      this.sanitizeBlock(height)
    );
    if (!blockWithTxs) {
      throw new BlockNotFoundError(height, this.blockchainConfig.blockchain);
    }

    const transactions = (blockWithTxs.transactions || []).map((tx) => ({
      ...tx,
      value: tx.value.toString(),
    }));
    return {
      ...blockWithTxs,
      transactions,
    };
  }
  async getBlock(height: BlockTag): Promise<IBlock> {
    const block = await this.getProvider().getBlock(this.sanitizeBlock(height));
    if (!block) {
      throw new BlockNotFoundError(height, this.blockchainConfig.blockchain);
    }
    return block;
  }
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
    params: ExecutionParams,
    isWrite = false
  ): Promise<ExecutionResponse<T>> {
    if (params.block) {
      params.block = this.sanitizeBlock(params.block);
    }

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

        let gasPrice;
        try {
          gasPrice = await this.etherClient
            .getFeeData()
            .then((data) => data.gasPrice.toHexString());
        } catch (err) {
          console.error("Error fetching Web3BaseAdapter.getFeeData");
        }

        const computedParams = computeInvocationParams(params, {
          gasLimit,
          ...(gasPrice ? { gasPrice } : {}),
        });

        // use callStatic to check if tx might fail before calling spending gas
        await contract.callStatic[method]
          .apply(null, computedParams)
          .catch((err: any) => {
            if (err.code && /UNPREDICTABLE_GAS_LIMIT/i.test(err.code)) {
              // ignore this error
              return;
            }
          });

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
      return res.status && res.status === 1
        ? TransactionStatus.Success
        : TransactionStatus.Failed;
    });
  }

  async getDecodedTransactionWithLogs(
    transactionHash: string,
    { abis = [] }: GetDecodedTransactionWithLogsOptions<ContractInterface> = {}
  ): Promise<ITransactionWithLogs> {
    const [res, receipt] = await Promise.all([
      this.web3Provider.getTransaction(transactionHash),
      this.web3Provider.getTransactionReceipt(transactionHash),
    ]);

    const block = await this.web3Provider.getBlock(res.blockNumber);

    const initializedAbis = Object.values(this.contracts).map((contract) =>
      this.getContractInterface(contract.address)
    );
    const ABIs = [...initializedAbis, ...abis] as any;
    const logsDecoder = new LogDecoder(ABIs);
    const logs: ITransactionLog[] = this.decodeTxLogs(receipt, logsDecoder);

    let smartContractCall;
    if (isSmartContractCall(res)) {
      const txDecoder = new TxDecoder(ABIs);
      const { args, method, signature } = this.decodeTxDetails(res, txDecoder);

      smartContractCall = {
        signature,
        method,
        args,
      };
    }

    return {
      status:
        receipt.status === 1
          ? TransactionStatus.Success
          : TransactionStatus.Failed,
      from: res.from,
      hash: transactionHash,
      blockHash: res.blockHash,
      value: res.value.toString(),
      blockNumber: res.blockNumber,
      raw: res.data,
      timestamp: block.timestamp,
      to: receipt.to,
      smartContractCall,
      logs,
    };
  }

  private decodeTxLogs(
    txReceipt: ethers.providers.TransactionReceipt,
    decoder: LogDecoder
  ): ITransactionLog[] {
    const decodedLogs = decoder.decodeLogs(txReceipt.logs);
    return decodedLogs.map((rawLog: any) => {
      const log = rawLog;
      const args = log.eventFragment.inputs.reduce(
        (t: any, curr: any, i: number) => {
          const argName: string = curr.name;
          t[argName] = log.args[i].toString();
          return t;
        },
        {} as Record<string, any>
      );

      return {
        tx_hash: txReceipt.transactionHash,
        name: log.name,
        signature: log.signature,
        topic: log.topic,
        address: log.address,
        args,
      };
    });
  }

  private decodeTxDetails(
    txRes: ethers.providers.TransactionResponse,
    decoder: TxDecoder
  ) {
    try {
      const decodedTx = decoder.decodeTx(txRes);

      const args = decodedTx.functionFragment.inputs.reduce((t, curr, i) => {
        const argName: string = curr.name;
        t[argName] = decodedTx.args[i].toString();
        return t;
      }, {} as Record<string, any>);

      return {
        method: decodedTx.name,
        signature: decodedTx.signature,

        args,
      };
    } catch (error) {
      return {
        method: "unknown",
        signature: "external",
        args: {},
      };
    }
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
  async getTransactionsFromEvents(
    contractAddress: string,
    { abi: givenAbi, fromBlock, toBlock }: GetTransactionsFromEventsOptions
  ): Promise<string[]> {
    const abi = givenAbi || this.getContractInterface(contractAddress);
    if (!abi) {
      throw new Error("You need to pass the contract ABI or initialize it");
    }

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      this.getProvider()
    );

    const events = await contract.queryFilter(
      {
        address: contract.address,
      },
      fromBlock,
      toBlock
    );
    return events.map((event) => event.transactionHash).filter(onlyUnique);
  }

  convertAddressTo(address: string): string {
    return address;
  }
}

function computeInvocationParams(
  params: ExecutionParams,
  gasOptions: { gasPrice?: string; gasLimit?: string } = {}
) {
  const { args, callValue } = params;

  const blockTag = params.block ? { blockTag: params.block } : {};
  const reducedContractParameters = [
    ...(args || []),
    { value: callValue ?? 0, ...gasOptions, ...blockTag },
  ];
  return reducedContractParameters;
}

function isSmartContractCall(res: ethers.Transaction) {
  return res.data !== "0x";
}
