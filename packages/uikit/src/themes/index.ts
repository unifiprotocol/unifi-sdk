import Dark from "./Dark";

export const Themes = {
  Dark,
};

export type UnifiTheme = typeof Dark;
export type Themed<T extends Record<string, any> = Record<string, any>> = {
  theme: UnifiTheme;
} & T;

export * from "./base";
