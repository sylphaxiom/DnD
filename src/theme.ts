import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

export const dark: ThemeOptions = {
  palette: {
    primary: {
      main: '#c478e0',
    },
    secondary: {
      main: '#3544b1',
    },
    background: {
      default: '#05060f',
      paper: '#05060f',
    },
    info: {
      main: '#00acc1',
    },
    divider: '#512da8',
  },
  typography: {
    fontFamily: "'Macondo', cursive",
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    subtitle1:{
      fontFamily: "'Kings', cursive",
      letterSpacing: 1.5,
      fontSize: "2.5rem",
    },
    subtitle2:{
      fontSize: "1.2rem",
      fontWeight: 400,
    },
    overline: {
      fontFamily: "Courier New, monospace",
    },
    body1: {
      fontSize: "1.4em"
    },
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 800,
    fontSize: 16,
  },
};

export const light: ThemeOptions = {
  palette: {
    primary: {
      main: '#8338a8',
    },
    secondary: {
      main: '#2537d2',
    },
    info: {
      main: '#00acc1',
    },
    divider: '#512da8',
    background: {
      default: '#f2f7fc',
      paper: '#f2f7fc',
    },
  },
  typography: {
    fontFamily: "'Macondo', cursive",
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    subtitle1:{
      fontFamily: "'Kings', cursive",
      letterSpacing: 1.5,
      fontSize: "2.5rem",
    },
    subtitle2:{
      fontSize: "1.2rem",
      fontWeight: 400,
    },
    overline: {
      fontFamily: "Courier New, monospace",
    },
    body1: {
      fontSize: "1.4em"
    },
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 800,
    fontSize: 16,
  },
};

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: {
    light: light,
    dark: dark,
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps:{
          slotProps: {
            paper: { style: { maxHeight: "35vh", maxWidth:"50%" } },
          },
        }
      }
    }
  }
});

export default theme