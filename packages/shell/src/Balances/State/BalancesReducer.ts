import { BalancesActionKind } from "./BalancesActions";
import { BalancesState, getBalancesInitialState } from "./BalanceState";
import { ShellPartialReducer } from "../../State/Types";

export const BalancesReducer: ShellPartialReducer<BalancesState> = (
  state,
  action,
  rootState
): BalancesState => {
  switch (action.type) {
    case BalancesActionKind.UPDATE_UNFI:
      return {
        ...state,
        unfiPrice: action.payload,
      };

    case BalancesActionKind.SET_UPDATING_BALANCES:
      return {
        ...state,
        refreshingBalances: action.payload,
      };

    case BalancesActionKind.ADD_TOKEN:
      const currency = action.payload;
      if (state.balances.some((c) => c.currency.equals(currency))) return state;
      return {
        ...state,
        balances: [...state.balances, { currency, balance: "0" }],
      };

    case BalancesActionKind.UPDATE_BALANCES:
      const newBalancesRaw = action.payload.balances;
      if (
        action.payload.blockchain !== rootState.adapter.activeChain.blockchain
      ) {
        console.warn("Ignore this balances");
        return state;
      }
      const balances = state.balances.reduce(
        (balances: BalancesState["balances"], b) => {
          const newBalance = newBalancesRaw.find((pb) =>
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
      const unmatchedBalances = newBalancesRaw.reduce(
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
        refreshingBalances: false,
        balances: [...balances, ...unmatchedBalances],
      };

    case BalancesActionKind.WIPE:
      return { ...state, ...getBalancesInitialState() };

    default:
      return state;
  }
};
