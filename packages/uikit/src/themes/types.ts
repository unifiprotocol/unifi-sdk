import { DarkTheme } from "./DarkTheme";

export type UnifiTheme = typeof DarkTheme;

export interface Themed {
  theme: UnifiTheme;
}
