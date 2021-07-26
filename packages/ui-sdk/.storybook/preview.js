// .storybook/preview.js

import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';

import { Theme } from '../src/Theme';

// pass ThemeProvider and array of your themes to decorator
addDecorator(withThemes(ThemeProvider, [Theme]));
