import { Currency } from "@unifiprotocol/utils";
import { withThemesProvider, DEFAULT_SETTINGS } from "themeprovider-storybook";
import { UnifiThemeProvider } from "../src/components/UnifiThemeProvider";
import { Themes } from "../src/themes";

const themes = Object.values(Themes);

const tokenLogoResolver = (address) =>
  `https://icon-service.unifi.report/icon_bsc?token=${address}`;

const tokenLink = (address) => `https://bscscan.com/token/${address}`;
const isNativeToken = (currency) => currency.address === "BNB";

export const decorators = [
  (StoryFn) => (
    <StoryFn />
  ),
  withThemesProvider(themes, DEFAULT_SETTINGS, ({ theme, children }) => {
    return (
      <UnifiThemeProvider
        theme={theme}
        options={{ tokenLogoResolver, tokenLink, isNativeToken }}
      >
        {children}
      </UnifiThemeProvider>
    );
  }),
];
