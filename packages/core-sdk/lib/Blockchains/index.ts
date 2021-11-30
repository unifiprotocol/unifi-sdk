import { Blockchains, IBlockchainConfig } from "../Types";
import { EthereumConfig } from "./Ethereum";

export const blockchainConfigMap: Partial<
  Record<Blockchains, IBlockchainConfig>
> = {
  [Blockchains.Ethereum]: EthereumConfig,
};
