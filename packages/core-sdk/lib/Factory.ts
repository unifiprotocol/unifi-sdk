import { injectable } from "inversify";
import { Blockchains } from "@unifiprotocol/utils";

import {
  IBlockchainConfig,
  IConnector,
  IBlockchainExplorer,
  IConnectorFactoryParams,
} from "./Types";
import { randomItem } from "./Utils/Array";
import { getBlockchainConfig } from "./container";
import { IFactory } from "./Types/IFactory";

@injectable()
export class Factory implements IFactory {
  getBlockchainConfig(blockchain: Blockchains): IBlockchainConfig {
    const config = getBlockchainConfig(blockchain);
    if (config) {
      return config;
    }
    throw new Error(`Blockchain config not found for ${blockchain}`);
  }

  getBlockchainWalletConnectors(blockchain: Blockchains): IConnector[] {
    return this.getBlockchainConfig(blockchain).wallets;
  }

  getBlockchainOfflineConnectors(blockchain: Blockchains): IConnector[] {
    return this.getBlockchainConfig(blockchain).offlineConnectors;
  }

  getBlockchainOfflineConnector(
    blockchain: Blockchains,
    _options: { random?: boolean } = {}
  ): IConnector {
    const { random } = { random: false, ..._options };
    const { offlineConnectors } = this.getBlockchainConfig(blockchain);
    return random ? randomItem(offlineConnectors) : offlineConnectors[0];
  }

  getBlockchainConnectors(blockchain: Blockchains): IConnector[] {
    const config = this.getBlockchainConfig(blockchain);
    return [...config.wallets, ...config.offlineConnectors];
  }

  getBlockchainConnectorByName(
    blockchain: Blockchains,
    connectorName: string
  ): IConnector {
    return this.getBlockchainConnectors(blockchain).find(
      (connector) => connector.name === connectorName
    );
  }

  getBlockchainConnectorByConfig(
    blockchain: Blockchains,
    { metadata, params }: IConnectorFactoryParams
  ): IConnector {
    const config = this.getBlockchainConfig(blockchain);
    if (!config.connectorFactory) {
      throw new Error(
        `Blockchain ${blockchain} custom connector factory not supported`
      );
    }
    return config.connectorFactory(config, metadata, params);
  }

  getBlockchainExplorer(blockchain: Blockchains): IBlockchainExplorer {
    return this.getBlockchainConfig(blockchain).explorer;
  }
}
