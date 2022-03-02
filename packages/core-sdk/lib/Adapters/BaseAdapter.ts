import { BN } from "@unifiprotocol/utils";
import { IBlockchainConfig } from "../Types/IBlockchainConfig";
import { AddressFormat, IAdapter } from "../Types/IAdapter";
import {
  ExecutionParams,
  ExecutionResponse,
  AdapterBalance,
  Address,
  BlockTag,
  GetDecodedTransactionWithLogsOptions,
  GetTransactionsFromEventsOptions,
  TransactionStatus,
  IBlock,
  IBlockWithTransactions,
  ITransactionWithLogs,
} from "../Types";

export abstract class BaseAdapter<ContractInterface, ProviderType>
  implements IAdapter<ContractInterface>
{
  protected address: Address = "";

  constructor(public readonly blockchainConfig: IBlockchainConfig) {}

  abstract setProvider(provider: ProviderType): void;
  abstract getProvider(): ProviderType;
  abstract resetContracts(): void;

  abstract isConnected(): boolean;
  abstract initializeContract(
    contractAddress: string,
    abi: ContractInterface
  ): Promise<void>;
  abstract initializeToken(
    contractAddress: string,
    abi?: ContractInterface
  ): Promise<void>;

  abstract execute<T = any>(
    contractAddress: string,
    method: string,
    values: Partial<ExecutionParams>,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>>;

  abstract waitForTransaction(
    transactionHash: string
  ): Promise<TransactionStatus>;
  abstract getContractInterface(contractAddress: string): ContractInterface;
  abstract getBalance(): Promise<AdapterBalance>;
  abstract isValidNetwork(network: string): Promise<boolean>;
  abstract getBlock(height: BlockTag): Promise<IBlock>;
  abstract getBlockWithTxs(height: string): Promise<IBlockWithTransactions>;
  abstract getDecodedTransactionWithLogs(
    transactionHash: string,
    options: GetDecodedTransactionWithLogsOptions<ContractInterface>
  ): Promise<ITransactionWithLogs>;
  abstract getTransactionsFromEvents(
    contractAddress: string,
    options?: GetTransactionsFromEventsOptions
  ): Promise<string[]>;

  abstract isValidAddress(address: Address): boolean;

  getTxLink(hash: string): string {
    return this.blockchainConfig.explorer.tx(hash);
  }

  getAddressLink(hash: string): string {
    return this.blockchainConfig.explorer.address(hash);
  }

  getTokenLink(hash: string): string {
    return this.blockchainConfig.explorer.token(hash);
  }

  setAddress(address: Address): void {
    this.address = address;
  }

  getAddress(): string {
    return this.address;
  }

  protected sanitizeBlock(block: BlockTag): BlockTag {
    if (BN(block).isNaN()) {
      return block;
    }
    return Number(block);
  }

  abstract convertAddressTo(address: string, format: AddressFormat): string;
}
