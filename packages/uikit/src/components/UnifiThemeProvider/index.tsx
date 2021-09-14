import React, { useContext } from "react";

import { ThemeProvider } from "styled-components";
import { UiContext, UiContextProps } from "../../context/uiContext";
import { Themed } from "../../themes/types";

import { GlobalStyle, GlobalFont } from "./GlobalStyles";
//import ResetCSS from "./ResetCSS";

export const UnifiThemeProvider: React.FC<Themed & UiContextProps> = ({
  theme,
  children,
  options,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <UiContext.Provider value={options}>
        {/*<ResetCSS />*/}
        <GlobalFont />
        <GlobalStyle />
        {children}
      </UiContext.Provider>
    </ThemeProvider>
  );
};
