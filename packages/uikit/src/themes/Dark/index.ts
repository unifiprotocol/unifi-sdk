import {
  blue100,
  red100,
  green100,
  green200,
  green300,
  grey200,
  grey100,
  grey300,
  yellow100,
  white100,
  white200,
  red200,
  red300,
  white300,
  yellow200,
  yellow300,
  blue200,
  blue300,
} from "./colors";

import { breakpointMap } from "../base";

export default {
  name: "Dark",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  // Colors
  primary: green100,
  primaryLight: green200,
  primaryDark: green300,

  secondary: "#2d3748",
  secondaryLight: "#2d3748", //light
  secondaryDark: "#1A202C",

  dangerLight: red100,
  danger: red200,
  dangerDark: red300,

  infoLight: blue100,
  info: blue200,
  infoDark: blue300,

  warningLight: yellow100,
  warning: yellow200,
  warningDark: yellow300,

  success: green100,
  successLight: green200,
  successDark: green300,

  // Contracts
  bgContrast100: white100,
  bgContrast200: white200,
  bgContrast300: white200,
  // Fonts
  txt100: white100,
  txt200: white200,
  txt300: white300,
  txtMuted: white300,
  // Backgrounds
  bg: grey100,
  bgAlt: grey200,
  bgAlt2: grey300,
  bgInput: grey100,
  // Cards
  cardShadow: "rgb(0 0 0 / 20%) 0px 0px 20px -5px",

  // Gradients
  shinyGradient: `linear-gradient(129deg, rgba(120,255,214,1) 0%, rgba(0,230,118,1) 48%, rgba(168,255,120,1) 89%, rgba(120,255,214,1) 100%)`,
  hotGradient: `linear-gradient(129deg, rgba(241,39,17,1) 0%, rgba(245,175,25,1) 41%, rgba(245,135,25,1) 75%, rgba(241,39,17,1) 100%)`,

  // Borders and shadows
  borderRadius: "5px",
  boxShadow: "0 0 15px 0 rgb(0 0 0 / 15%)",

  // zIndexes
  zIndex: {
    modal: 900,
  },
  // Sizes
  inputHeight: "3rem",
  // Responsivenes
  breakpoints: breakpointMap,
};
