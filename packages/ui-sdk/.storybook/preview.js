import { addDecorator } from '@storybook/react';
import React from 'react';
import { UThemeProvider } from '../src/components/UThemeProvider';
import { Themes } from '../src/themes';
const withThemeProvider = (Story, context) => {
  return (
    <UThemeProvider theme={Themes.Dark}>
      <Story {...context} />
    </UThemeProvider>
  );
};

addDecorator(withThemeProvider);

/*
Ideally use this plugin in order to have theme details . But cannot change bg
import { withThemes } from '@react-theming/storybook-addon';
addDecorator(withThemes(UThemeProvider, [DarkTheme])); 
*/
