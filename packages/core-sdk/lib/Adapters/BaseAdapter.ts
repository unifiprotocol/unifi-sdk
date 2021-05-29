import { BlockTag, Block } from '@ethersproject/abstract-provider'
import { ContractInterface } from '@ethersproject/contracts'
import { Currency } from '@root/Entities/Currency'
import { IAdapter } from './IAdapter'
import { ExecutionParams, ExecutionResponse, AdapterBalance, Address, AdapterEvent } from './Types'
import { EventEmitter } from 'eventemitter3'
export abstract class BaseAdapter implements IAdapter {
  protected address: Address = ''
  protected emitter = new EventEmitter<AdapterEvent>()

  constructor(public nativeToken: Currency, public explorerUrl: string) {
    this.nativeToken = nativeToken
    this.explorerUrl = explorerUrl
  }

  abstract setProvider(provider: any): void
  abstract resetContracts(): void

  abstract isConnected(): boolean
  abstract initializeContract(contractAddress: string, abi: ContractInterface): void
  abstract execute<T = any>(
    contractAddress: string,
    method: string,
    values: Partial<ExecutionParams>,
    isWrite?: boolean
  ): Promise<ExecutionResponse<T>>

  abstract waitForTransaction(transactionHash: string): Promise<'SUCCESS' | 'FAILED'>

  abstract getBalance(): Promise<AdapterBalance>
  abstract getBlock(blockTag: BlockTag): Promise<Block>
  abstract isValidNetwork(network: string): Promise<boolean>
  abstract getTxLink(hash: string): string
  abstract getAddressLink(hash: string): string
  abstract getTokenLink(hash: string): string
  abstract initEventController(): Promise<void>

  on(event: AdapterEvent, callback: (...args: any[]) => any): void {
    this.emitter.on(event, callback)
  }

  setAddress(address: Address) {
    this.address = address
  }
  getAddress() {
    return this.address
  }
}
