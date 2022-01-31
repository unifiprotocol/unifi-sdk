import React, { useEffect, useState } from "react";

import { ThemeProvider } from "styled-components";
import { ModalProvider } from "../../widgets/modal";
import { UiContext, UiContextProps } from "../../context/UiContext";
import { Themed } from "../../themes";

import { GlobalStyle, GlobalFont } from "./GlobalStyles";
import {
  NotificationsProvider,
  NotificationsProviderProps,
} from "../../widgets/Notifications";
//import ResetCSS from "./ResetCSS";

type UnifiThemeProviderProps = Themed &
  UiContextProps & { notifications?: NotificationsProviderProps };

export const UnifiThemeProvider: React.FC<UnifiThemeProviderProps> = ({
  theme,
  children,
  options,
  notifications,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <UiContext.Provider value={options}>
        <NotificationsProvider {...notifications} />
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
