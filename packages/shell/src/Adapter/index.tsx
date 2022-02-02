import {
  Connectors,
  getBlockchainConnectorByName,
  getBlockchainOfflineConnectors,
  IConnector,
  IConnectorAdapters,
} from "@unifiprotocol/core-sdk";
import { createContext, Dispatch, useContext, useReducer } from "react";
import Config, { IConfig } from "../Config";
import { timedReject } from "../Utils";

export enum AdapterActionKind {
  CONNECT,
  DISCONNECT,
  SWITCH_CHAIN,
}

export interface AdapterAction {
  type: AdapterActionKind;
  payload: IConnectorAdapters | IConfig;
}

export interface AdapterState {
  connector: IConnector;
  activeChain: IConfig;
}

const reducer = (state: AdapterState, action: AdapterAction) => {
  const { type, payload } = action;
  switch (type) {
    case AdapterActionKind.CONNECT:
      return {
        ...state,
      };
    case AdapterActionKind.DISCONNECT:
      state.connector.disconnect();
      return {
        ...state,
      };
    case AdapterActionKind.SWITCH_CHAIN:
      state.connector.disconnect();
      const cfg = payload as IConfig;
      return {
        ...state,
        connector: getBlockchainOfflineConnectors(cfg.blockchain)[0],
        activeChain: cfg,
      };
    default:
      return state;
  }
};

const initialState: AdapterState = {
  connector: getBlockchainOfflineConnectors(Config[0].blockchain)[0],
  activeChain: Config[0],
};

const AdapterContext = createContext<{
  state: AdapterState;
  dispatch: Dispatch<AdapterAction>;
}>({ state: initialState, dispatch: () => null });

export const AdapterProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AdapterContext.Provider value={{ state, dispatch }}>
      {children}
    </AdapterContext.Provider>
  );
};

export const useAdapter = () => {
  const { state, dispatch } = useContext(AdapterContext);

  const { connector, activeChain } = state;

  const connect = async (connectorName: Connectors) => {
    const walletConnector = getBlockchainConnectorByName(
      activeChain.blockchain,
      connectorName
    );
    const offlineConnector = getBlockchainOfflineConnectors(
      activeChain.blockchain
    )[0];
    const successConnection = (adapter: IConnectorAdapters) => {
      dispatch({ type: AdapterActionKind.CONNECT, payload: adapter });
    };
    try {
      await Promise.race([
        timedReject(10_000),
        walletConnector.connect().then(successConnection),
      ]).catch(() => offlineConnector.connect().then(successConnection));
    } catch (err) {
      offlineConnector.connect().then(successConnection);
    }
  };

  const connectOffline = () => {
    const offlineConnector = getBlockchainOfflineConnectors(
      activeChain.blockchain
    )[0];
    offlineConnector.connect().then((adapter) => {
      dispatch({ type: AdapterActionKind.CONNECT, payload: adapter });
    });
  };

  const updateChain = (cfg: IConfig) => {
    dispatch({
      type: AdapterActionKind.SWITCH_CHAIN,
      payload: cfg,
    });
  };

  return {
    connector,
    activeChain,
    connect,
    connectOffline,
    updateChain,
  };
};
