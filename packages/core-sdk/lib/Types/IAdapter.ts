import { Blockchains } from "../Types";
import { Currency } from "@unifiprotocol/utils";

import { BigNumberish } from "@ethersproject/bignumber";
import { IBlockchainConfig } from "./IBlockchainConfig";

export type AdapterBalance = { name: string; balance: string };

export type Address = string;

export interface ExecutionResponse<T = any> {
  success: boolean;
  method?: string;
  value: T;
  hash: string;
  params?: any;
  err?: any;
}

export interface ExecutionParams {
  args: Array<string | number | undefined | string[] | BigNumberish>;
  callValue: string | number | undefined;
}

export type ExecutionValueProps = Partial<ExecutionParams>;

export type TransactionResult = "SUCCESS" | "FAILED";

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

  waitForTransaction(transactionHash: string): Promise<"SUCCESS" | "FAILED">;

  getBalance(): Promise<AdapterBalance>;

  isValidNetwork(network: string): Promise<boolean>;

  getTxLink(hash: string): string;
  getAddressLink(hash: string): string;
  getTokenLink(hash: string): string;

  setAddress(address: Address): void;
  getAddress(): Address;

  isValidAddress(address: Address): boolean;
}
