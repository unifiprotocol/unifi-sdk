import {
  Connectors,
  getBlockchainConnectorByName,
  getBlockchainOfflineConnector,
  getBlockchainOfflineConnectors,
  IAdapter,
  IConnector,
  IMulticallAdapter,
  InvalidNetworkError,
} from "@unifiprotocol/core-sdk";
import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useReducer,
} from "react";

import Configs, { IConfig } from "../Config";
import { ShellEventBus } from "../EventBus";
import { AddressChanged } from "../EventBus/Events/AdapterEvents";
import { Wipe } from "../EventBus/Events/BalancesEvents";
import { ShowNotification } from "../EventBus/Events/NotificationEvents";
import { ShellNotifications } from "../Notifications";
import { timedReject } from "../Utils";
import { getChainOnStorage, setChainOnStorage } from "../Utils/ChainStorage";

enum AdapterActionKind {
  CONNECT = "CONNECT",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  DISCONNECT = "DISCONNECT",
  SWITCH_CHAIN = "SWITCH_CHAIN",
}

interface AdapterAction {
  type: AdapterActionKind;
  payload: IConnector | IConfig | undefined | Error;
}

export interface AdapterState {
  connector?: IConnector;
  adapter?: IAdapter;
  multicallAdapter?: IMulticallAdapter;
  activeChain: IConfig;
  walletError?: Error;
}

const reducer = (state: AdapterState, action: AdapterAction): AdapterState => {
  const { type, payload } = action;
  switch (type) {
    case AdapterActionKind.CONNECT:
      const connector = payload as IConnector;
      // keep error if connecting to offline wallet after error
      const walletError = connector.isWallet ? undefined : state.walletError;
      return {
        ...state,
        connector,
        adapter: connector.adapter?.adapter,
        multicallAdapter: connector.adapter?.multicall,
        walletError,
      };
    case AdapterActionKind.DISCONNECT:
      return {
        ...state,
      };
    case AdapterActionKind.CONNECTION_ERROR:
      return {
        ...state,
        walletError: action.payload as Error,
      };
    case AdapterActionKind.SWITCH_CHAIN:
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

const initialState: AdapterState = (function () {
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
    connector: getBlockchainOfflineConnector(Configs[0].blockchain),
    activeChain: Configs[0],
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

  const { connector, activeChain, adapter, multicallAdapter, walletError } =
    state;

  const handleWalletConnectionError = useCallback(
    async (error: any) => {
      if (error instanceof InvalidNetworkError) {
        ShellEventBus.emit(
          new ShowNotification(
            new ShellNotifications.Blockchain.WrongNetworkNotification(
              activeChain.blockchain
            )
          )
        );
      }
      throw error;
    },
    [activeChain.blockchain]
  );

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
            .then(() => successConnection(walletConnector))
            .catch(handleWalletConnectionError),
        ]);
        walletConnector.on("AddressChanged", (address: string) => {
          ShellEventBus.emit(new AddressChanged(address));
        });
      } catch (err) {
        dispatch({
          type: AdapterActionKind.CONNECTION_ERROR,
          payload: err as Error,
        });
        offlineConnector
          .connect()
          .then(() => successConnection(offlineConnector));
      }
    },
    [activeChain.blockchain, dispatch, handleWalletConnectionError]
  );

  const connectOffline = useCallback(() => {
    const offlineConnector = getBlockchainOfflineConnector(
      activeChain.blockchain
    );
    offlineConnector
      .connect()
      .then(() =>
        dispatch({ type: AdapterActionKind.CONNECT, payload: offlineConnector })
      );
  }, [activeChain.blockchain, dispatch]);

  const updateChain = useCallback(
    (cfg: IConfig) => {
      setChainOnStorage(cfg.blockchain);
      connector?.disconnect();
      dispatch({
        type: AdapterActionKind.SWITCH_CHAIN,
        payload: cfg,
      });
    },
    [dispatch, connector]
  );

  const disconnect = useCallback(async () => {
    if (!connector) {
      return;
    }
    connector.disconnect();
    dispatch({ type: AdapterActionKind.DISCONNECT, payload: undefined });
    ShellEventBus.emit(new Wipe());
    connectOffline();
  }, [connectOffline, connector, dispatch]);

  const isAdapterReady = !!(adapter && multicallAdapter);

  return {
    isAdapterReady,
    adapter,
    multicallAdapter,
    connector,
    activeChain,
    walletError,
    connect,
    connectOffline,
    disconnect,
    updateChain,
  };
};
