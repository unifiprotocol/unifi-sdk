export enum ERC20ContractMethods {
  BalanceOf = "balanceOf",
  Transfer = "transfer",
  Approve = "approve",
}

export type TERC20Params<T = any> = {
  contractAddress: string;
  params: T;
};
