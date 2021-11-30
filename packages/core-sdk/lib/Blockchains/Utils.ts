import { BaseConnector } from "../Connectors/BaseConnector";
import { IBlockchainConfig } from "../Types";

export const blockchainConfigFactory = (
  params: Omit<IBlockchainConfig, "wallets" | "offlineConnectors">,
  connectorClasses: Array<new (config: IBlockchainConfig) => BaseConnector>
): IBlockchainConfig => {
  const config: IBlockchainConfig = {
    ...params,
    wallets: [],
    offlineConnectors: [],
  };

  connectorClasses.forEach((connectorClass) => {
    const connector = new connectorClass(config);
    if (connector.isWallet) {
      return config.wallets.push(connector);
    }
    config.offlineConnectors.push(connector);
  });
  return config;
};
