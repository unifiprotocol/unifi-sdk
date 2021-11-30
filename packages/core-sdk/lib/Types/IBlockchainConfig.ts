import { Currency } from "@unifiprotocol/utils";
import { BaseConnector } from "../Connectors/BaseConnector";
import { Blockchains, EthChainIds } from "../Types";

export interface IBlockchainConfig {
  blockchain: Blockchains;

  nativeToken: Currency;
  chainId: EthChainIds;
  wallets: BaseConnector[];
  offlineConnectors: BaseConnector[];
  multicall?: {
    supported: boolean;
    address: string;
  };
  explorer: {
    baseUrl: string;
    address(address: string): string;
    token(address: string): string;
    tx(hash: string): string;
  };
}
