import React, { useContext } from "react";

import { ThemeProvider } from "styled-components";
import { UiResolverCtx, TokenLogoResolverFn } from "../../context/uiContext";
import { Themed } from "../../themes/types";

import { GlobalStyle, GlobalFont } from "./GlobalStyles";
//import ResetCSS from "./ResetCSS";

type Options = { tokenLogoResolver?: TokenLogoResolverFn };

export const UnifiThemeProvider: React.FC<Themed & Options> = ({
  theme,
  children,
  options,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <UiResolverCtx.Provider value={options}>
        {/*<ResetCSS />*/}
        <GlobalFont />
        <GlobalStyle />
        {children}
      </UiResolverCtx.Provider>
    </ThemeProvider>
  );
};
