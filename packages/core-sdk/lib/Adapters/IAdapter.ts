import { Currency } from "../Entities";
import { ContractInterface, ethers } from "ethers";
import {
  AdapterBalance,
  Address,
  ExecutionResponse,
  ExecutionValueProps,
} from "./Types";

export interface IAdapter {
  readonly nativeToken: Currency;

  isConnected(): boolean;

  initializeContract(contractAddress: string, abi: ContractInterface): void;
  initializeToken(contractAddress: string, abi?: ContractInterface): void;

  getContractInterface(contractAddress: string): ContractInterface;

  resetContracts(): void;

  execute<T = any>(
    contractAddress: string,
    method: string,
    values: ExecutionValueProps,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>>;

  supportsMulticall(): boolean;

  waitForTransaction(transactionHash: string): Promise<"SUCCESS" | "FAILED">;

  getBalance(): Promise<AdapterBalance>;
  getBlock(
    blockTag: ethers.providers.BlockTag
  ): Promise<ethers.providers.Block>;
  isValidNetwork(network: string): Promise<boolean>;
  getTxLink(hash: string): string;
  getAddressLink(hash: string): string;
  getTokenLink(hash: string): string;

  setAddress(address: Address): void;
  getAddress(): Address;

  setProvider(provider: any): void;
  getProvider(): any;
  isValidAddress(address: Address): boolean;
}
