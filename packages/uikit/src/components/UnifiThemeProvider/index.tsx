import React from "react";

import { ThemeProvider } from "styled-components";
import { Themed } from "../../themes/types";

import { GlobalStyleFactory, GlobalFontFactory } from "./GlobalStyles";
//import ResetCSS from "./ResetCSS";

export const UnifiThemeProvider: React.FC<Themed> = ({ theme, children }) => {
  const GlobalFont = GlobalFontFactory();
  const GlobalStyle = GlobalStyleFactory();
  return (
    <ThemeProvider theme={theme}>
      {/*<ResetCSS />*/}
      <GlobalFont />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
