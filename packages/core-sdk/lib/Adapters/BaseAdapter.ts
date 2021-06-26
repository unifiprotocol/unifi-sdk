import { BlockTag, Block } from "@ethersproject/abstract-provider";
import { ContractInterface } from "@ethersproject/contracts";
import { Currency } from "../Entities";
import { IAdapter } from "./IAdapter";
import {
  ExecutionParams,
  ExecutionResponse,
  AdapterBalance,
  Address,
} from "./Types";
export abstract class BaseAdapter implements IAdapter {
  protected address: Address = "";

  constructor(public nativeToken: Currency, public explorerUrl: string) {
    this.nativeToken = nativeToken;
    this.explorerUrl = explorerUrl;
  }

  abstract setProvider(provider: any): void;
  abstract getProvider(): any;
  abstract resetContracts(): void;

  abstract isConnected(): boolean;
  abstract initializeContract(
    contractAddress: string,
    abi: ContractInterface
  ): void;
  abstract initializeToken(
    contractAddress: string,
    abi?: ContractInterface
  ): void;

  abstract execute<T = any>(
    contractAddress: string,
    method: string,
    values: Partial<ExecutionParams>,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>>;

  supportsMulticall(): boolean {
    return false;
  }

  abstract waitForTransaction(
    transactionHash: string
  ): Promise<"SUCCESS" | "FAILED">;

  abstract getContractInterface(contractAddress: string): ContractInterface;
  abstract getBalance(): Promise<AdapterBalance>;
  abstract getBlock(blockTag: BlockTag): Promise<Block>;
  abstract isValidNetwork(network: string): Promise<boolean>;
  abstract getTxLink(hash: string): string;
  abstract getAddressLink(hash: string): string;
  abstract getTokenLink(hash: string): string;

  setAddress(address: Address) {
    this.address = address;
  }
  getAddress() {
    return this.address;
  }

  abstract isValidAddress(address: Address): boolean;
}
