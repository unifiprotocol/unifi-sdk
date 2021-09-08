import React from 'react';
import { DarkTheme, Themed } from './Theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, GlobalFont } from './GlobalStyles';

export const UThemeProvider: React.FC<Themed> = ({ theme = DarkTheme, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalFont />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
