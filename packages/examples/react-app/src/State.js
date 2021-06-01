import { atom } from "recoil";

export const AppState = atom({
  key: "appState",
  default: {
    adapter: undefined,
    connector: undefined,
  },
  dangerouslyAllowMutability: true,
});
