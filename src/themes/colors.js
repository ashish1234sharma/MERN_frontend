import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  A100: "#919eab29",
  // A200: "#eeeeee",
  // A400: "#00b8d929",
  // A700: "#006c9c"
};

const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',

  A400: "#00b8d929",
  A700: "#006c9c"
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const TEXT = {
  white: '#FFFFFF',
  black: "#212B36",
  dark: '#0F0E0E',
  primary: "#2065D1",
  secondary: "#3366FF",
  error: "#FF4842",
  grey: "#637381",
  info: "#1890FF",
  inherit: GREY[800],
  success: "#00a76f",
  warning: "#FFC107",
  disabled: GREY[500],
}
export function themeColors(theme) {
  return {
    common: {
      black: '#000',
      paper: "#ffffffe6",
      shap: '#ffffffcc',
      iconButton: '#919eab14',
      background: '#eef2f6',
      white: '#fff',
      toolbarBG: "rgba(255, 255, 255, 0.88)",
      transparent: "transparent"
    },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[500], 0.24),
    text: TEXT,
    background: {
      paper: '#fff',
      default: GREY[100],
      neutral: GREY[200],
    },
    action: {
      active: GREY[600],
      hover: alpha(GREY[500], 0.08),
      selected: alpha(GREY[500], 0.16),
      disabled: alpha(GREY[500], 0.8),
      disabledBackground: alpha(GREY[500], 0.24),
      focus: alpha(GREY[500], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
}
