import DarkTheme from "./Dark";

export type UnifiTheme = typeof DarkTheme;

export type Themed<T = any> = {
  theme: UnifiTheme;
} & T;
