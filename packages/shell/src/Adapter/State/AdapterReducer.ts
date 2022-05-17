import { getBlockchainOfflineConnectors } from "@unifiprotocol/core-sdk";
import { AdapterActionKind } from "./AdapterActions";
import { AdapterState } from "./AdapterState";
import { ShellPartialReducer } from "../../State/Types";

export const AdapterReducer: ShellPartialReducer<AdapterState> = (
  state,
  action
): AdapterState => {
  switch (action.type) {
    case AdapterActionKind.CONNECT:
      const connector = action.payload;
      // keep error if connecting to offline wallet after error
      const walletError = connector.isWallet ? undefined : state.walletError;
      state.connector?.disconnect();
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
        walletError: action.payload,
      };
    case AdapterActionKind.SWITCH_CHAIN:
      const cfg = action.payload;
      return {
        ...state,
        activeChain: cfg,
      };
    default:
      return state;
  }
};
