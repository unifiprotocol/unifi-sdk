import { DarkTheme } from "./DarkTheme";

export type UnifiTheme = typeof DarkTheme;

export type Themed<T = any> = {
  theme: UnifiTheme;
} & T;
