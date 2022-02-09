export type BlockTag = string;

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

export interface ITransactionReceipt {
  hash: string;
  blockNumber?: number;
  blockHash?: string;
  timestamp?: number;
  from: string;
  to?: string;
  raw?: string;
}
