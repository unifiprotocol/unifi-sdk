import React from "react";

import { ThemeProvider } from "styled-components";
import { ModalProvider } from "../../widgets/modal";
import { UiContext, UiContextProps } from "../../context/UiContext";
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
        <ModalProvider>
          {/*<ResetCSS />*/}
          <GlobalFont />
          <GlobalStyle />
          {children}
        </ModalProvider>
      </UiContext.Provider>
    </ThemeProvider>
  );
};
