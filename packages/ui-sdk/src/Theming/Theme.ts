const grey0 = '#191a21';
const grey1 = '#1f2127';
const grey2 = '#242732';

const green0 = '#00e676';
const green1 = '#38f997f0';
const green2 = '#00c364';

const blue100 = '#29b6f6';
const yellow100 = '#ffe082';

export const DarkTheme = {
  name: 'DarkTheme',
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  // Colors
  primary: green0,
  primaryLight: green1,
  primaryDark: green2,
  danger: '#de4437',
  info: blue100,
  warning: yellow100,
  success: green2,
  // Fonts
  txt0: '#fff',
  txt2: '#989eb5',

  // Backgrounds
  bg0: grey0,
  bg1: grey1,
  bg2: grey2,

  // Borders and shadows
  borderRadius: '5px',
  boxShadow: '0 0 15px 0 rgb(0 0 0 / 15%)',
};

export interface Themed {
  theme: typeof DarkTheme;
}
