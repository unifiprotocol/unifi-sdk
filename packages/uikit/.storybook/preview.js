import { withThemesProvider, DEFAULT_SETTINGS } from "themeprovider-storybook";
import { UnifiThemeProvider } from "../src/components/UnifiThemeProvider";
import { Themes } from "../src/themes";
const themes = Object.values(Themes);

export const decorators = [withThemesProvider(themes, DEFAULT_SETTINGS, UnifiThemeProvider)];
