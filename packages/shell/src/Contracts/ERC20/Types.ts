export enum ERC20ContractMethods {
  BalanceOf = "balanceOf",
  Transfer = "transfer",
}

export type TERC20Params<T = any> = {
  contractAddress: string;
  params: T;
};
