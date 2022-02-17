import { Currency } from "@unifiprotocol/utils";

import {
  Blockchains,
  EthChainIds,
  IConnector,
  IBlockchainExplorer,
} from "../Types";

export interface IBlockchainConfig {
  blockchain: Blockchains;
  publicRpc: string;
  nativeToken: Currency;
  wrappedToken: Currency;
  upToken?: Currency;
  unfiToken?: Currency;
  chainId: EthChainIds;
  wallets: IConnector[];
  offlineConnectors: IConnector[];
  multicall: {
    supported: boolean;
    address?: string;
    tryAggregate?: boolean;
  };
  explorer: IBlockchainExplorer;
}
