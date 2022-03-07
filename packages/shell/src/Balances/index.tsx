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
  UPDATE_UNFI,
  WIPE,
}

export interface BalancesState {
  balances: { currency: Currency; balance: string }[];
  unfiPrice: string;
}

export interface BalancesAction {
  type: BalancesActionKind;
  payload: string | Currency | BalancesState["balances"] | undefined;
}

const reducer = (state: BalancesState, action: BalancesAction) => {
  const { type, payload } = action;
  switch (type) {
    case BalancesActionKind.UPDATE_UNFI:
      if (typeof payload !== "string") return state;
      return {
        ...state,
        unfiPrice: payload,
      };

    case BalancesActionKind.ADD_TOKEN:
      if (
        !(
          payload &&
          payload.hasOwnProperty("address") &&
          payload.hasOwnProperty("name") &&
          payload.hasOwnProperty("decimals")
        )
      ) {
        return state;
      }
      const currency = payload as Currency;
      if (state.balances.some((c) => c.currency.equals(currency))) return state;
      return {
        ...state,
        balances: [...state.balances, { currency, balance: "0" }],
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
      return initialState();

    default:
      return state;
  }
};

const initialState: () => BalancesState = () => ({
  balances: [],
  unfiPrice: localStorage.getItem("UNFI_PRICE") ?? "0.0",
});

const BalancesContext = createContext<{
  state: BalancesState;
  dispatch: Dispatch<BalancesAction>;
}>({ state: initialState(), dispatch: () => null });

export const BalancesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  return (
    <BalancesContext.Provider value={{ state, dispatch }}>
      {children}
    </BalancesContext.Provider>
  );
};

export const useBalances = () => {
  const { state, dispatch } = useContext(BalancesContext);

  const { balances, unfiPrice } = state;

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

  const updateUnfiPrice = useCallback(
    (unfiPrice: string) => {
      dispatch({ type: BalancesActionKind.UPDATE_UNFI, payload: unfiPrice });
    },
    [dispatch]
  );

  const getBalanceByCurrency = useCallback(
    (currency: Currency) => {
      const currentBalances = balances.find((b) => b.currency.equals(currency));
      return currentBalances?.balance ?? "0";
    },
    [balances]
  );

  const getBalanceByAddress = useCallback(
    (address: string) => {
      const currentBalances = balances.find(
        (b) => b.currency.address.toLowerCase() === address.toLowerCase()
      );
      return currentBalances?.balance ?? "0";
    },
    [balances]
  );

  return {
    balances,
    unfiPrice,
    updateBalances,
    addToken,
    wipe,
    updateUnfiPrice,
    getBalanceByCurrency,
    getBalanceByAddress,
  };
};
