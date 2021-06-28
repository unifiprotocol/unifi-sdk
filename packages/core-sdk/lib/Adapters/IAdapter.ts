import { Currency } from "../Entities";
import {
  AdapterBalance,
  Address,
  ExecutionResponse,
  ExecutionValueProps,
} from "./Types";
import { Blockchains } from "../Types";

export interface IAdapter<ContractInterface = any> {
  readonly nativeToken: Currency;
  readonly blockchain: Blockchains;

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

  waitForTransaction(transactionHash: string): Promise<"SUCCESS" | "FAILED">;

  getBalance(): Promise<AdapterBalance>;

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
