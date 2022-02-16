export type BlockTag = "latest" | string;

export interface IBlockBase {
  hash: string;
  parentHash: string;
  number: number;
  timestamp: number;
}

export interface IBlock extends IBlockBase {
  transactions: string[];
}

export interface IBlockWithTransactions extends IBlockBase {
  transactions: ITransactionReceipt[];
}

export enum TransactionStatus {
  Failed = "FAILED",
  Success = "SUCCESS",
}

type ScArgs = Record<string, any>;
export interface ITransactionReceipt {
  hash: string;
  blockNumber?: number;
  status?: TransactionStatus;
  blockHash?: string;
  timestamp?: number;
  from: string;
  smartContractCall?: {
    method: string;
    signature: string;
    args: ScArgs;
  };
  to?: string;
  raw?: string;
}

export interface ITransactionLog {
  tx_hash: string;
  name: string;
  signature: string;
  topic: string;
  address: string;
  args: ScArgs;
}

export interface ITransactionWithLogs extends ITransactionReceipt {
  logs: ITransactionLog[];
}
