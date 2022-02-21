import { Blockchains } from "@unifiprotocol/utils";

import {
  IBlockchainConfig,
  IConnector,
  IBlockchainExplorer,
  IWeb3ConnectorFactoryParams,
} from "../Types";
import { ITronConnectorFactoryParams } from "../Blockchains/Tron";

// todo: move to @unifiprotocol/utils
type Web3Blockchains = Exclude<Blockchains, Blockchains.Tron>;

export interface IFactory {
  getBlockchainConnectorByConfig: {
    (
      blockchain: Blockchains.Tron,
      params: ITronConnectorFactoryParams
    ): IConnector;

    (
      blockchain: Web3Blockchains,
      params: IWeb3ConnectorFactoryParams
    ): IConnector;
  };

  getBlockchainConfig(blockchain: Blockchains): IBlockchainConfig;

  getBlockchainWalletConnectors(blockchain: Blockchains): IConnector[];

  getBlockchainOfflineConnectors(blockchain: Blockchains): IConnector[];
  getBlockchainOfflineConnector(
    blockchain: Blockchains,
    options?: { random?: boolean }
  ): IConnector;

  getBlockchainConnectors(blockchain: Blockchains): IConnector[];

  getBlockchainConnectorByName(
    blockchain: Blockchains,
    connectorName: string
  ): IConnector;

  getBlockchainExplorer(blockchain: Blockchains): IBlockchainExplorer;
}
