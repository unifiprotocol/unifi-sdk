import { Web3BaseConnector } from "../Connectors";
import { BaseConnector } from "../Connectors/BaseConnector";
import { IBlockchainConfig, OfflineConnectors, IConnector } from "../Types";

export const web3ConnectorFactory =
  (name: OfflineConnectors, jsonRpcUrl: string) =>
  (config: IBlockchainConfig): IConnector =>
    new Web3BaseConnector(
      jsonRpcUrl,
      {
        name,
        displayName: name,
        isWallet: false,
      },
      config
    );

type OfflineConnector = (config: IBlockchainConfig) => IConnector;

export const blockchainConfigFactory = (
  params: Omit<IBlockchainConfig, "wallets" | "offlineConnectors">,
  connectorClasses: Array<new (config: IBlockchainConfig) => BaseConnector>,
  offlineConnectorFactories: [OfflineConnector, ...OfflineConnector[]]
): IBlockchainConfig => {
  const config: IBlockchainConfig = {
    ...params,
    wallets: [],
    offlineConnectors: [],
  };

  offlineConnectorFactories.forEach((factory) => {
    config.offlineConnectors.push(factory(config));
  });

  connectorClasses.forEach((connectorClass) => {
    const connector = new connectorClass(config);
    if (connector.isWallet) {
      return config.wallets.push(connector);
    }
    config.offlineConnectors.push(connector);
  });
  return config;
};
