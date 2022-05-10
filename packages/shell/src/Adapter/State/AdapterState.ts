import {
  getBlockchainOfflineConnector,
  IAdapter,
  IConnector,
  IMulticallAdapter,
} from "@unifiprotocol/core-sdk";
import Configs, { defaultConfig, IConfig } from "../../Config";
import { getChainOnStorage, setChainOnStorage } from "../../Utils/ChainStorage";

export interface AdapterState {
  connector?: IConnector;
  adapter?: IAdapter;
  multicallAdapter?: IMulticallAdapter;
  activeChain: IConfig;
  walletError?: Error;
}

const getInitialChain = () => {
  let chain = getChainOnStorage();
  const chainOverrideSetter = new URL(window.location.href).searchParams
    .get("blockchain")
    ?.toLowerCase();
  if (chainOverrideSetter) {
    const chainMatched = Configs.find(
      (config) => config.blockchain.toLowerCase() === chainOverrideSetter
    );
    if (chainMatched) {
      setChainOnStorage(chainMatched.blockchain);
      chain = chainMatched.blockchain;
    }
  }
  return chain;
};

export const getAdapterInitialState = (): AdapterState => {
  const chain = getInitialChain();
  if (chain) {
    const cfg = Configs.find((cfg) => cfg.blockchain === chain);
    if (cfg) {
      return {
        connector: getBlockchainOfflineConnector(cfg.blockchain),
        activeChain: cfg,
      };
    }
  }
  return {
    connector: getBlockchainOfflineConnector(defaultConfig.blockchain),
    activeChain: defaultConfig,
  };
};
