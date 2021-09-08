import React from 'react';
import { UThemeProvider, DarkTheme } from '../src/Theming';

const withThemeProvider = (Story, context) => {
  return (
    <UThemeProvider theme={DarkTheme}>
      <Story {...context} />
    </UThemeProvider>
  );
};

const decorators = [withThemeProvider];

export { decorators };
