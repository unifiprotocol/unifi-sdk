import {
  OfflineConnectors,
  IConnector,
  IBlockchainConfig,
} from "../../../Types";
import {
  TronOfflineConnector,
  TronOfflineConnectorParams,
} from "./Offline/TronOfflineConnector";

export const tronConnectorFactory =
  (name: OfflineConnectors, tronWebParams: TronOfflineConnectorParams) =>
  (config: IBlockchainConfig): IConnector =>
    new TronOfflineConnector(
      tronWebParams,
      {
        name,
        displayName: name,
        isWallet: false,
      },
      config
    );
