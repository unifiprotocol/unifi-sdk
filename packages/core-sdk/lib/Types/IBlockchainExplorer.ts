export interface IBlockchainExplorer {
  baseUrl: string;
  address(address: string): string;
  token(address: string): string;
  tx(hash: string): string;
}
