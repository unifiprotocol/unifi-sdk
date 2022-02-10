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
  WIPE,
}

export interface BalancesState {
  balances: { currency: Currency; balance: string }[];
}

export interface BalancesAction {
  type: BalancesActionKind;
  payload: Currency | BalancesState["balances"] | undefined;
}

const reducer = (state: BalancesState, action: BalancesAction) => {
  const { type, payload } = action;
  switch (type) {
    case BalancesActionKind.ADD_TOKEN:
      if (!(payload instanceof Currency)) return state;
      if (state.balances.some((c) => c.currency.equals(payload))) return state;
      return {
        ...state,
        balances: [...state.balances, { currency: payload, balance: "0" }],
      };

    case BalancesActionKind.UPDATE_BALANCES:
      if (!Array.isArray(payload)) return state;
      const balances = state.balances.reduce(
        (balances: BalancesState["balances"], b) => {
          const newBalance = payload.find((pb) =>
            pb.currency.equals(b.currency)
          );
          if (newBalance) {
            balances.push(newBalance);
          } else {
            balances.push(b);
          }
          return balances;
        },
        []
      );
      const unmatchedBalances = payload.reduce(
        (unmatchedBalances: BalancesState["balances"], b) => {
          if (!balances.some((x) => x.currency.equals(b.currency))) {
            unmatchedBalances.push(b);
          }
          return unmatchedBalances;
        },
        []
      );
      return {
        ...state,
        balances: [...balances, ...unmatchedBalances],
      };

    case BalancesActionKind.WIPE:
      return initialState;

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

  const wipe = useCallback(() => {
    dispatch({ type: BalancesActionKind.WIPE, payload: undefined });
  }, [dispatch]);

  return { balances, updateBalances, addToken, wipe };
};
