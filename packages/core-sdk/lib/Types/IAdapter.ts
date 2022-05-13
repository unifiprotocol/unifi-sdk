import { BigNumberish } from "@ethersproject/bignumber";
import {
  IBlock,
  IBlockWithTransactions,
  BlockTag,
  ITransactionWithLogs,
  TransactionStatus,
} from "./BlockAndTxs";
import { IBlockchainConfig } from "./IBlockchainConfig";

export type AdapterBalance = { name: string; balance: string };

export type Address = string;

export enum AddressFormat {
  Native = "Native",
  Hex = "Hex",
}

export interface ExecutionResponse<T = any> {
  success: boolean;
  method?: string;
  value: T;
  hash: string;
  params?: any;
  err?: any;
}

export interface SignMessageParams {
  type?: "typed" | "basic";
}
export interface GetDecodedTransactionWithLogsOptions<ContractInterface> {
  abis?: ContractInterface[];
}
export type GetTransactionsFromEventsOptions = {
  abi?: any[];
  fromBlock?: number;
  toBlock?: number;
};
export interface ExecutionParams {
  args: Array<string | number | undefined | string[] | BigNumberish>;
  callValue: string | number | undefined;
  block?: string | number;
}

export type ExecutionValueProps = Partial<ExecutionParams>;

export type TransactionResult =
  | TransactionStatus.Success
  | TransactionStatus.Failed;

export interface IAdapter<ContractInterface = any> {
  readonly blockchainConfig: IBlockchainConfig;

  getProvider(): any;
  isConnected(): boolean;

  initializeContract(
    contractAddress: string,
    abi: ContractInterface
  ): Promise<void>;

  initializeToken(
    contractAddress: string,
    abi?: ContractInterface
  ): Promise<void>;

  getContractInterface(contractAddress: string): ContractInterface;
  resetContracts(): void;
  execute<T = string>(
    contractAddress: string,
    method: string,
    values: ExecutionValueProps,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>>;

  getBalance(): Promise<AdapterBalance>;
  isValidNetwork(network: string): Promise<boolean>;

  // Transaction methods
  waitForTransaction(transactionHash: string): Promise<TransactionStatus>;
  getDecodedTransactionWithLogs(
    transactionHash: string,
    options?: GetDecodedTransactionWithLogsOptions<ContractInterface>
  ): Promise<ITransactionWithLogs>;

  // Signing methods
  signMessage(message: string, params?: SignMessageParams): Promise<string>;

  // Explorer methods
  getTxLink(hash: string): string;
  getAddressLink(hash: string): string;
  getTokenLink(hash: string): string;

  // Block methods
  getBlock(height?: BlockTag): Promise<IBlock>;
  getBlockWithTxs(height?: BlockTag): Promise<IBlockWithTransactions>;
  // Event methods
  getTransactionsFromEvents(
    contractAddress: string,
    options?: GetTransactionsFromEventsOptions
  ): Promise<string[]>;
  // Address methods
  setAddress(address: Address): void;
  getAddress(format?: AddressFormat): Address;
  convertAddressTo(address: string, format: AddressFormat): Address;
  isValidAddress(address: Address): boolean;
}
