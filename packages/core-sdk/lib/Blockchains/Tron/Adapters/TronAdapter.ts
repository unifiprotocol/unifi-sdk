import TronWeb from "tronweb";
import { ERC20ABI } from "../../../Abis/ERC20";
// TODO REMOVE AND USE tronweb.address.toHex/fromHex
import * as TronAddressFormat from "tron-format-address";
import {
  AdapterBalance,
  Address,
  ExecutionParams,
  ExecutionResponse,
  GetDecodedTransactionWithLogsOptions,
  IBlock,
  IBlockWithTransactions,
  BlockTag,
  ITransactionWithLogs,
  ITransactionLog,
  GetTransactionsFromEventsOptions,
  TransactionStatus,
} from "../../../Types";
import { BaseAdapter } from "../../../Adapters/BaseAdapter";
import { Opt } from "../../../Utils/Typings";
import { nonSuccessResponse, successResponse } from "../../../Adapters/Helpers";
import { BN } from "@unifiprotocol/utils";
import { TronChainId } from "../TronChainIds";
import { ContractInterface, ethers } from "ethers";
import { decodeTx } from "../Utils/TxDecoder";
import {
  mapTronTxToGlobal,
  mapTrxBlockToGlobalInterface,
  normalizeResponse,
  removeNumericKeys,
} from "../Utils/ResponseNormalizer";
import { onlyUnique } from "../../../Utils/Array";

const MAX_EVENT_PAGE_SIZE = 200;

type TronContractInterface = ethers.ContractInterface;
type TronProvider = TronWeb;
type Contract = any;

export class TronAdapter extends BaseAdapter<
  TronContractInterface,
  TronProvider
> {
  private _provider: Opt<TronProvider>;
  protected contracts: { [nameContract: string]: Contract } = {};

  setProvider(provider: TronProvider): void {
    this._provider = provider;
  }
  getProvider(): TronProvider {
    return this._provider;
  }
  resetContracts(): void {
    this.contracts = {};
  }
  isConnected(): boolean {
    return !!this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  async initializeContract(
    contractAddress: string,
    abi: TronContractInterface
  ): Promise<void> {
    if (
      this.contracts[contractAddress] ||
      contractAddress === this.blockchainConfig.nativeToken.address
    ) {
      return;
    }

    const contract = await this._provider.contract(abi as any, contractAddress);

    this.contracts[contractAddress] = contract;
  }

  async execute<T = any>(
    contractAddress: string,
    method: string,
    values: Partial<ExecutionParams>,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>> {
    const { args, callValue } = values;
    try {
      const contract = this.contracts[contractAddress];

      if (
        contractAddress === this.blockchainConfig.nativeToken.address &&
        ["allowance", "approve"].includes(method)
      ) {
        return successResponse({
          method,
          value: BN(2 ** 256).toFixed(),
        });
      }

      if (isWrite) {
        const response = await contract[method].apply(null, args).send({
          feeLimit: 100_000_000,
          callValue: callValue || 0,
          shouldPollResponse: false,
          keepTxID: true,
        });

        if (response) {
          return successResponse({
            method,
            hash: response,
          });
        }
      } else {
        const contractResponse = await contract[method]
          .apply(null, args)
          .call({ _isConstant: true });

        if (contractResponse) {
          const abi = this.getContractInterface(contractAddress);
          return successResponse({
            method,
            hash: "",
            value: normalizeResponse(method, abi, args, contractResponse),
          });
        }
      }
      return nonSuccessResponse({
        method,
        params: args,
      });
    } catch (err) {
      return nonSuccessResponse({
        method,
        err,
      });
    }
  }

  async waitForTransaction(txnHash: string): Promise<TransactionStatus> {
    return new Promise<TransactionStatus>((resolve) => {
      const ignoreNotFoundErrors = () => {
        return;
      };
      const isSuccess = (res: any) =>
        res.ret.some((r: any) => r.contractRet === TransactionStatus.Success);
      const checkTx = () => {
        return this._provider.trx
          .getConfirmedTransaction(txnHash)
          .catch(ignoreNotFoundErrors)
          .then((res: any) => {
            if (typeof res === "object") {
              return resolve(
                isSuccess(res)
                  ? TransactionStatus.Success
                  : TransactionStatus.Failed
              );
            }
            setTimeout(checkTx, 1500);
          });
      };
      checkTx();
    });
  }
  getContractInterface(_contractAddress: string): TronContractInterface {
    const contractAddress = _contractAddress.startsWith("0x")
      ? TronAddressFormat.fromHex(_contractAddress)
      : _contractAddress;
    const contract = this.contracts[contractAddress];
    if (!contract) {
      throw new Error(`Contract ${contractAddress} not initialized`);
    }
    return contract.abi;
  }
  async getBalance(address: Address = this.address): Promise<AdapterBalance> {
    const balance = await this._provider.trx.getBalance(address);
    return {
      name: this.blockchainConfig.nativeToken.symbol,
      balance,
    };
  }

  async isValidNetwork(network: string): Promise<boolean> {
    return network === TronChainId.Mainnet;
  }
  isValidAddress(address: string): boolean {
    try {
      this._provider.address.toHex(address);
    } catch (_) {
      return false;
    }
    return true;
  }

  getAddressLink(address: string): string {
    return this.blockchainConfig.explorer.address(address);
  }
  getTokenLink(address: string): string {
    return this.blockchainConfig.explorer.token(address);
  }
  getTxLink(hash: string | number): string {
    return this.blockchainConfig.explorer.tx(`${hash}`);
  }

  getBlock(height: BlockTag = "latest"): Promise<IBlock> {
    if (height === "latest") {
      return this._provider.trx
        .getCurrentBlock()
        .then(mapTrxBlockToGlobalInterface);
    }
    return this._provider.trx
      .getBlockByNumber(height)
      .then(mapTrxBlockToGlobalInterface);
  }

  async getBlockWithTxs(height: BlockTag): Promise<IBlockWithTransactions> {
    const [_block, txs] = await Promise.all([
      this.getBlock(height),
      this._provider.trx.getTransactionFromBlock(height, undefined),
    ]);

    const block: IBlockWithTransactions = {
      ..._block,
      transactions: [],
    };

    block.transactions = txs.map((tx: any) => mapTronTxToGlobal(block, tx));

    return block;
  }

  async initializeToken(
    tokenAddress: Address,
    abi: TronContractInterface = ERC20ABI
  ): Promise<void> {
    this.initializeContract(tokenAddress, abi);
  }

  toHexAddress(address: string): string {
    return this._provider.address.toHex(address);
  }

  async getDecodedTransactionWithLogs(
    transactionHash: string,
    { abis = [] }: GetDecodedTransactionWithLogsOptions<ContractInterface> = {}
  ): Promise<ITransactionWithLogs> {
    const [_tx, _txInfo, _txEvents] = await Promise.all([
      this.getProvider().trx.getTransaction(transactionHash),
      this.getProvider().trx.getTransactionInfo(transactionHash),
      this.getProvider().getEventByTransactionID(transactionHash),
    ]);

    const tx = mapTronTxToGlobal(
      {
        number: _txInfo.blockNumber,
        timestamp: Math.floor(_txInfo.blockTimeStamp / 1000),
      },
      _tx
    );

    const logs: ITransactionLog[] = _txEvents.map((event: any) => ({
      address: event.contract,
      name: event.name,
      signature: this.getEventSignature(event),
      tx_hash: transactionHash,
      topic: event.name,
      args: removeNumericKeys(event.result),
    }));

    let smartContractCall: ITransactionWithLogs["smartContractCall"];

    if (isTxCallingSmartContract(_tx)) {
      const initializedAbis = Object.values(this.contracts).map((contract) =>
        this.getContractInterface(contract.address)
      );

      const { args, method, signature } = decodeTx(_tx, [
        ...initializedAbis,
        ...abis,
      ]);
      smartContractCall = {
        method,
        signature,
        args,
      };
    }
    const status =
      _tx?.ret && _tx?.ret[0]?.contractRet === "SUCCESS"
        ? TransactionStatus.Success
        : TransactionStatus.Failed;

    return {
      ...tx,
      status,
      smartContractCall,
      logs,
    };
  }
  private getEventSignature(event: any) {
    const abi = this.contracts[event.contract]?.abi;
    if (!abi) {
      return event.name;
    }
    const eventAbi = (abi as any[]).find(
      (def) => def.type === "event" && def.name === event.name
    );
    if (!eventAbi) {
      return event.name;
    }
    const inputTypes = eventAbi.inputs.map((input: any) => input.type);

    return `${event.name}(${inputTypes.join(",")})`;
  }
  async getTransactionsFromEvents(
    contractAddress: string,
    { fromBlock, toBlock }: GetTransactionsFromEventsOptions
  ): Promise<string[]> {
    const events = await this.getProvider().getEventResult(contractAddress, {
      size: MAX_EVENT_PAGE_SIZE,
    });

    return events
      .filter((event) => {
        const min = !fromBlock || fromBlock >= event.block;
        const max = !toBlock || toBlock <= event.block;
        return min && max;
      })
      .map((event) => event.transaction)
      .filter(onlyUnique);
  }
}

function isTxCallingSmartContract(_tx: any) {
  return ["TriggerSmartContract"].includes(_tx?.raw_data?.contract[0]?.type);
}
