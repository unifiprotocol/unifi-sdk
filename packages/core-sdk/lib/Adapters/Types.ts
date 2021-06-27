import { BigNumberish } from "@ethersproject/bignumber";

export type AdapterBalance = { name: string; balance: string };

export type Address = string;
export interface ExecutionResponse<T = any> {
  success: boolean;
  multicall: boolean;
  functionName?: string;
  value: T;
  hash: string;
  params?: ExecutionValueProps;
  err?: any;
}

export interface ExecutionParams {
  args: Array<string | number | undefined | string[] | BigNumberish>;
  callValue: string | number | undefined;
}

export type ExecutionValueProps = Partial<ExecutionParams>;

export type TransactionResult = "SUCCESS" | "FAILED";
