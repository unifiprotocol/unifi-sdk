import React from 'react';

import { ThemeProvider } from 'styled-components';
import { UTheme } from '../../types';
import { GlobalStyle, GlobalFont } from './GlobalStyles';

export const UThemeProvider: React.FC<UTheme> = ({ theme, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalFont />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
