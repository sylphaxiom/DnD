import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const dark: ThemeOptions = {
  palette: {
    primary: {
      main: '#4d69fd',
    },
    secondary: {
      main: '#ab47bc',
    },
    background: {
      default: '#292929',
    },
    text: {
      primary: '#f5f5f5',
    },
    info: {
      main: '#00acc1',
    },
    divider: '#512da8',
  },
  typography: {
    fontFamily: 'Livvic',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 900,
    fontSize: 16,
  },
};

export const light: ThemeOptions = {
  palette: {
    primary: {
      main: '#1c35c5',
    },
    secondary: {
      main: '#ca3be4',
    },
    info: {
      main: '#00acc1',
    },
    divider: '#512da8',
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Livvic',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 900,
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
  }
});

export default theme