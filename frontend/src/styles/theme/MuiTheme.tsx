import type { Theme, Palette } from '@mui/material';
import { Typography } from '@mui/material/styles/createTypography';
import { rgb } from 'color';
import OswaldTTF from 'assets/fonts/Oswald-VariableFont_wght.ttf';
import Roboto from 'assets/fonts/Roboto-Regular.ttf';

type RequiredTypesFromTheme = Pick<Theme, 'components'>;

interface CustomTypography
  extends Pick<
    Typography,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2'
  > {
  logo: any;
}

export type CustomThemeType = RequiredTypesFromTheme & {
  typography: CustomTypography;
  palette: Pick<
    Palette,
    'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'text'
  >;
};

export const theme: CustomThemeType = {
  typography: {
    body1: {
      fontSize: 17,
      fontFamily: 'Oswald',
    },
    body2: {
      fontSize: 17,
      fontFamily: 'Roboto',
    },
    h1: {
      fontFamily: 'Oswald',
      fontWeight: 850,
      fontSize: 40,
    },
    h2: {
      fontFamily: 'Oswald',
      fontWeight: 800,
      fontSize: 27,
    },
    h3: {
      fontFamily: 'Oswald',
      fontWeight: 750,
      fontSize: 24,
    },
    h4: {
      fontFamily: 'Oswald',
      fontWeight: 700,
      fontSize: 21,
    },
    h5: {
      fontFamily: 'Oswald',
      fontWeight: 650,
      fontSize: 18,
    },
    h6: {
      fontFamily: 'Oswald',
      fontWeight: 600,
      fontSize: 15,
    },
    logo: {
      fontSize: 20,
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontWeight: 400,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Oswald';
          src: local('Oswald'), local('Oswald-Regular'), url(${OswaldTTF}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Roboto'), local('Roboto-Regular'), url(${Roboto}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },

  palette: {
    primary: {
      main: '#464547',
      contrastText: 'white',
      dark: '#333333',
      light: '#BDC0CC',
    },
    secondary: {
      main: '#39C2D7',
      contrastText: 'white',
      light: '',
      dark: '',
    },
    error: {
      main: '#E53935',
      contrastText: 'white',
      light: '',
      dark: '',
    },
    warning: {
      main: '#FB8C00',
      contrastText: 'white',
      light: '',
      dark: '',
    },
    info: {
      main: '#2196F3',
      contrastText: 'white',
      light: '',
      dark: '',
    },
    success: {
      main: '#4CAF50',
      contrastText: 'white',
      light: '',
      dark: '',
    },
    text: rgb(13, 13, 13),
  },
};
