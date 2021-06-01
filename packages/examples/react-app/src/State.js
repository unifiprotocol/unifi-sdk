import { atom } from "recoil";

export const AppState = atom({
  key: "appState",
  default: {
    blockchain: undefined,
    adapter: undefined,
    connector: undefined,
  },
  dangerouslyAllowMutability: true,
});
