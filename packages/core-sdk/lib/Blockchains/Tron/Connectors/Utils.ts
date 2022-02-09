import {
  OfflineConnectors,
  IConnector,
  IBlockchainConfig,
} from "../../../Types";
import { TronOfflineConnector } from "./Offline/TronOfflineConnector";

export const tronConnectorFactory =
  (name: OfflineConnectors, fullHost: string) =>
  (config: IBlockchainConfig): IConnector =>
    new TronOfflineConnector(
      { fullHost },
      {
        name,
        displayName: name,
        isWallet: false,
      },
      config
    );
