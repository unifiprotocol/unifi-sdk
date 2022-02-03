import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useReducer,
} from "react";

export enum BalancesActionKind {
  ADD_TOKEN,
  UPDATE_BALANCES,
}

export interface BalancesState {
  balances: { [address: string]: string };
}

export interface BalancesAction {
  type: BalancesActionKind;
  payload: string | BalancesState["balances"];
}

const reducer = (state: BalancesState, action: BalancesAction) => {
  const { type, payload } = action;
  switch (type) {
    case BalancesActionKind.ADD_TOKEN:
      if (typeof payload !== "string") return state;
      return {
        ...state,
        balances: { ...state.balances, [payload]: "0" },
      };
    case BalancesActionKind.UPDATE_BALANCES:
      if (typeof payload === "string") return state;
      return {
        ...state,
        balances: {
          ...state.balances,
          ...payload,
        },
      };
    default:
      return state;
  }
};

const initialState: BalancesState = {
  balances: {},
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
    (balances: BalancesState["balances"]) => {
      dispatch({ type: BalancesActionKind.UPDATE_BALANCES, payload: balances });
    },
    [dispatch]
  );

  return { balances, updateBalances };
};
