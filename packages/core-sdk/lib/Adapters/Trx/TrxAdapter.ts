import { AdapterBalance, ExecutionParams, ExecutionResponse } from "../Types";
import { BlockTag, Block } from "@ethersproject/abstract-provider";
import { ContractInterface } from "@ethersproject/contracts";
import { BaseAdapter } from "../BaseAdapter";
import { Tron } from "./NativeToken";
import { XRC20ABI } from "../Iotex/ABIs/XRC20ABI";

declare global {
  interface Window {
    tronWeb: any;
  }
}

export class TrxAdapter extends BaseAdapter {
  constructor() {
    super(Tron, "https://tronscan.org/");
  }

  setProvider(provider: any): void {
    throw new Error("TRX Adapter not implemented yet");
  }
  resetContracts(): void {
    throw new Error("TRX Adapter not implemented yet");
  }
  isConnected(): boolean {
    throw new Error("TRX Adapter not implemented yet");
  }
  initializeContract(contractAddress: string, abi: ContractInterface): void {
    throw new Error("TRX Adapter not implemented yet");
  }
  initializeToken(
    contractAddress: string,
    abi: ContractInterface = XRC20ABI
  ): void {
    throw new Error("TRX Adapter not implemented yet");
  }
  execute<T = any>(
    contractAddress: string,
    method: string,
    values: Partial<ExecutionParams>,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>> {
    throw new Error("TRX Adapter not implemented yet");
  }
  waitForTransaction(transactionHash: string): Promise<"SUCCESS" | "FAILED"> {
    throw new Error("TRX Adapter not implemented yet");
  }
  isWalletAvailable(): Promise<boolean> {
    throw new Error("TRX Adapter not implemented yet");
  }
  getBalance(): Promise<AdapterBalance> {
    throw new Error("TRX Adapter not implemented yet");
  }
  getBlock(blockTag: BlockTag): Promise<Block> {
    throw new Error("TRX Adapter not implemented yet");
  }
  isValidNetwork(network: string): Promise<boolean> {
    throw new Error("TRX Adapter not implemented yet");
  }
  getTxLink(hash: string): string {
    throw new Error("TRX Adapter not implemented yet");
  }
  getAddressLink(hash: string): string {
    throw new Error("TRX Adapter not implemented yet");
  }
  getTokenLink(hash: string): string {
    throw new Error("TRX Adapter not implemented yet");
  }
  isValidAddress(address: string): boolean {
    throw new Error("TRX Adapter not implemented yet");
  }
}
