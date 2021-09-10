import { blue100, red100, green0, green1, green2, grey0, grey1, grey2, yellow100, white100, white200 } from "./colors";

export const DarkTheme = {
  name: "DarkTheme",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  // Colors
  primary: green0,
  primaryLight: green1,
  primaryDark: green2,
  danger: red100,
  info: blue100,
  warning: yellow100,
  success: green2,
  // Fonts
  txt0: white100,
  txt2: white200,
  // Backgrounds
  bg0: grey0,
  bg1: grey1,
  bg2: grey2,

  // Borders and shadows
  borderRadius: "5px",
  boxShadow: "0 0 15px 0 rgb(0 0 0 / 15%)",
};
