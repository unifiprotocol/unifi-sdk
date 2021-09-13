import React from "react";

import { ThemeProvider } from "styled-components";
import { Themed } from "../../themes/types";

import { GlobalStyle, GlobalFont } from "./GlobalStyles";
//import ResetCSS from "./ResetCSS";

export const UnifiThemeProvider: React.FC<Themed> = ({ theme, children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/*<ResetCSS />*/}
      <GlobalFont />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
