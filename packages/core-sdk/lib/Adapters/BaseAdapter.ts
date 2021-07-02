import { Currency } from "../Entities";
import { Blockchains } from "../Types";
import { IAdapter } from "./IAdapter";
import {
  ExecutionParams,
  ExecutionResponse,
  AdapterBalance,
  Address,
} from "./Types";

declare global {
  interface Window {
    adapterExecuteStats: any;
  }
}

export abstract class BaseAdapter<ContractInterface, ProviderType>
  implements IAdapter<ContractInterface>
{
  protected address: Address = "";

  constructor(
    public blockchain: Blockchains,
    public nativeToken: Currency,
    public explorerUrl: string
  ) {}

  protected gatherExecuteStats(contractMethod: string, args: any): void {
    if (!window.adapterExecuteStats) {
      window.adapterExecuteStats = {};
    }
    if (!window.adapterExecuteStats[contractMethod]) {
      window.adapterExecuteStats[contractMethod] = {
        count: 0,
        calls: [],
      };
    }
    window.adapterExecuteStats[contractMethod].count++;
    window.adapterExecuteStats[contractMethod].calls.push(args);
  }

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
  ): Promise<"SUCCESS" | "FAILED">;

  abstract getContractInterface(contractAddress: string): ContractInterface;
  abstract getBalance(): Promise<AdapterBalance>;

  abstract isValidNetwork(network: string): Promise<boolean>;
  abstract getTxLink(hash: string): string;
  abstract getAddressLink(hash: string): string;
  abstract getTokenLink(hash: string): string;

  setAddress(address: Address): void {
    this.address = address;
  }

  getAddress(): string {
    return this.address;
  }

  abstract isValidAddress(address: Address): boolean;
}
