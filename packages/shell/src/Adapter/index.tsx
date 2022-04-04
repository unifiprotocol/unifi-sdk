import {
  Connectors,
  getBlockchainConnectorByName,
  getBlockchainOfflineConnector,
  getBlockchainOfflineConnectors,
  IConnector,
} from "@unifiprotocol/core-sdk";
import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useReducer,
} from "react";
import Config, { IConfig } from "../Config";
import { ShellEventBus } from "../EventBus";
import { AddressChanged } from "../EventBus/Events/AdapterEvents";
import { Wipe } from "../EventBus/Events/BalancesEvents";
import { timedReject } from "../Utils";
import { getChainOnStorage, setChainOnStorage } from "../Utils/ChainStorage";

export enum AdapterActionKind {
  CONNECT = "CONNECT",
  DISCONNECT = "DISCONNECT",
  SWITCH_CHAIN = "SWITCH_CHAIN",
}

export interface AdapterAction {
  type: AdapterActionKind;
  payload: IConnector | IConfig | undefined;
}

export interface AdapterState {
  connector: IConnector;
  activeChain: IConfig;
}

const reducer = (state: AdapterState, action: AdapterAction) => {
  const { type, payload } = action;
  switch (type) {
    case AdapterActionKind.CONNECT:
      const connector = payload as IConnector;
      return {
        ...state,
        connector,
      };
    case AdapterActionKind.DISCONNECT:
      state.connector.disconnect();
      return {
        ...state,
      };
    case AdapterActionKind.SWITCH_CHAIN:
      state.connector.disconnect();
      const cfg = payload as IConfig;
      const offlineConnector = getBlockchainOfflineConnectors(
        cfg.blockchain
      )[0];
      offlineConnector.connect();
      return {
        ...state,
        activeChain: cfg,
        connector: offlineConnector,
      };
    default:
      return state;
  }
};

const initialState: AdapterState = (function () {
  const chain = getChainOnStorage();
  if (chain) {
    const cfg = Config.find((cfg) => cfg.blockchain === chain);
    if (cfg) {
      return {
        connector: getBlockchainOfflineConnector(cfg.blockchain),
        activeChain: cfg,
      };
    }
  }
  return {
    connector: getBlockchainOfflineConnector(Config[0].blockchain),
    activeChain: Config[0],
  };
})();

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

  const connect = useCallback(
    async (connectorName: Connectors) => {
      const walletConnector = getBlockchainConnectorByName(
        activeChain.blockchain,
        connectorName
      );
      const offlineConnector = getBlockchainOfflineConnector(
        activeChain.blockchain
      );
      const successConnection = (payload: IConnector) => {
        dispatch({ type: AdapterActionKind.CONNECT, payload });
      };
      try {
        await Promise.race([
          timedReject(10_000),
          walletConnector
            .connect()
            .then(() => successConnection(walletConnector)),
        ]);
        walletConnector.on("AddressChanged", (address) => {
          ShellEventBus.emit(new AddressChanged(address));
        });
      } catch (err) {
        offlineConnector
          .connect()
          .then(() => successConnection(offlineConnector));
      }
    },
    [activeChain.blockchain, dispatch]
  );

  const connectOffline = useCallback(() => {
    const offlineConnector = getBlockchainOfflineConnectors(
      activeChain.blockchain
    )[0];
    offlineConnector
      .connect()
      .then(() =>
        dispatch({ type: AdapterActionKind.CONNECT, payload: offlineConnector })
      );
  }, [activeChain.blockchain, dispatch]);

  const updateChain = useCallback(
    (cfg: IConfig) => {
      setChainOnStorage(cfg.blockchain);
      dispatch({
        type: AdapterActionKind.SWITCH_CHAIN,
        payload: cfg,
      });
    },
    [dispatch]
  );

  const disconnect = useCallback(async () => {
    if (!connector) {
      return;
    }
    dispatch({ type: AdapterActionKind.DISCONNECT, payload: undefined });
    ShellEventBus.emit(new Wipe());
    connectOffline();
  }, [connectOffline, connector, dispatch]);

  return {
    adapter: connector.adapter,
    connector,
    activeChain,
    connect,
    connectOffline,
    disconnect,
    updateChain,
  };
};
