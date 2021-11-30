import { BaseConnector } from "../Connectors/BaseConnector";
import { IBlockchainConfig } from "../Types";

export const addConnectors = (
  config: IBlockchainConfig,
  connectorClasses: Array<new (config: IBlockchainConfig) => BaseConnector>
): void => {
  connectorClasses.forEach((connectorClass) => {
    const connector = new connectorClass(config);
    if (connector.isWallet) {
      config.wallets.push(connector);
    }
    config.offlineConnectors.push(connector);
  });
};
