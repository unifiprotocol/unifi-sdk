import { Currency } from '@root/Entities/Currency'
import { ContractInterface, ethers } from 'ethers'
import {
  AdapterBalance,
  AdapterEvent,
  Address,
  ExecutionResponse,
  ExecutionValueProps
} from './Types'

export interface IAdapter {
  readonly nativeToken: Currency

  isConnected(): boolean

  initializeContract(contractAddress: string, abi: ContractInterface): void
  resetContracts(): void

  execute<T = any>(
    contractAddress: string,
    method: string,
    values: ExecutionValueProps,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>>

  waitForTransaction(transactionHash: string): Promise<'SUCCESS' | 'FAILED'>

  getBalance(): Promise<AdapterBalance>
  getBlock(blockTag: ethers.providers.BlockTag): Promise<ethers.providers.Block>
  isValidNetwork(network: string): Promise<boolean>
  getTxLink(hash: string): string
  getAddressLink(hash: string): string
  getTokenLink(hash: string): string

  setAddress(address: Address): void
  getAddress(): Address

  setProvider(provider: any): void
  initEventController(): Promise<void>
  on(event: AdapterEvent, callback: (...args: any) => any): void
}

export const NON_SUCCESS_RESPONSE: ExecutionResponse = {
  success: false,
  value: '',
  hash: ''
}
