import { Web3BaseConnector } from "../Connectors";
import { BaseConnector } from "../Connectors/BaseConnector";
import { IBlockchainConfig, OfflineConnectors } from "../Types";

export const web3ConnectorFactory =
  (name: OfflineConnectors, jsonRpcUrl: string) =>
  (config: IBlockchainConfig): Web3BaseConnector =>
    new Web3BaseConnector(
      jsonRpcUrl,
      {
        name,
        displayName: name,
        isWallet: false,
      },
      config
    );

export const blockchainConfigFactory = (
  params: Omit<IBlockchainConfig, "wallets" | "offlineConnectors">,
  connectorClasses: Array<new (config: IBlockchainConfig) => BaseConnector>,
  web3offlineConnectors: Array<(config: IBlockchainConfig) => Web3BaseConnector>
): IBlockchainConfig => {
  const config: IBlockchainConfig = {
    ...params,
    wallets: [],
    offlineConnectors: [],
  };

  web3offlineConnectors.forEach((factory) => {
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
