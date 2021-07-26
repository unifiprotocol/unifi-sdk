export const Theme = {
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  primaryColor: '#00e676',
  secondaryColor: '#fff',
  dangerColor: '#de4437',
  lightGrey: '#242732',
  lightestGrey: '#303340',
  lightGreen: '#38f997f0',
  lightFontColor: '#989eb5',
  warningColor: '#ffe082',
  pink: '#e91e63',
  blue: '#29b6f6',
  grey: '#1f2127',
  darkGrey: '#191a21',
  borderRadius: '5px',
  boxShadow: '0 0 15px 0 rgb(0 0 0 / 15%)',
  topbar: {
    height: '3.5rem',
  },
  sidebar: {
    transitionTime: '0.25s',
    width: '15rem',
    miniWidth: '4.5rem',
  },
  breakpoints: {
    xs: 'max-width: 575px',
    sm: 'min-width: 576px',
    lg: 'min-width: 992px',
    untilLg: 'max-width: 992px',
    untilSm: 'max-width: 576px',
  },
};
export interface Themed {
  theme: typeof Theme;
}
