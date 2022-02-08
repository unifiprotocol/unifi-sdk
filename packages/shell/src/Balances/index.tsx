import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { Currency } from "@unifiprotocol/utils";

export enum BalancesActionKind {
  ADD_TOKEN,
  UPDATE_BALANCES,
}

export interface BalancesState {
  balances: { currency: Currency; balance: string }[];
}

export interface BalancesAction {
  type: BalancesActionKind;
  payload: Currency | BalancesState["balances"];
}

const reducer = (state: BalancesState, action: BalancesAction) => {
  const { type, payload } = action;
  switch (type) {
    case BalancesActionKind.ADD_TOKEN:
      if (!(payload instanceof Currency)) return state;
      if (state.balances.find((c) => c.currency.equals(payload))) return state;
      return {
        ...state,
        balances: [...state.balances, { currency: payload, balance: "0" }],
      };
    case BalancesActionKind.UPDATE_BALANCES:
      if (payload instanceof Currency) return state;
      return {
        ...state,
        balances: [...payload],
      };
    default:
      return state;
  }
};

const initialState: BalancesState = {
  balances: [],
};

const BalancesContext = createContext<{
  state: BalancesState;
  dispatch: Dispatch<BalancesAction>;
}>({ state: initialState, dispatch: () => null });

export const BalancesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BalancesContext.Provider value={{ state, dispatch }}>
      {children}
    </BalancesContext.Provider>
  );
};

export const useBalances = () => {
  const { state, dispatch } = useContext(BalancesContext);

  const { balances } = state;

  const updateBalances = useCallback(
    (balances: BalancesState["balances"]) =>
      dispatch({ type: BalancesActionKind.UPDATE_BALANCES, payload: balances }),
    [dispatch]
  );

  const addToken = useCallback(
    (token: Currency) => {
      dispatch({ type: BalancesActionKind.ADD_TOKEN, payload: token });
    },
    [dispatch]
  );

  return { balances, updateBalances, addToken };
};
