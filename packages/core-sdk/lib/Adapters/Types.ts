import { BigNumberish } from '@ethersproject/bignumber'

export type AdapterBalance = { name: string; balance: string }

export type AdapterError = 'wallet_not_installed' | 'wrong_chain_id'

export type Address = string
export interface ExecutionResponse<T = any> {
  success: boolean
  functionName?: string
  value: T
  hash: string
  params?: ExecutionValueProps
  err?: any
}

export interface ExecutionParams {
  args: Array<string | number | undefined | string[] | BigNumberish>
  callValue: string | number | undefined
}

export type ExecutionValueProps = Partial<ExecutionParams>

export type TransactionResult = 'SUCCESS' | 'FAILED'

export type AdapterEvent = 'AddressChanged' | 'NetworkChanged'
