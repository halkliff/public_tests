import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Theme, createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, blueGrey, grey } from '@material-ui/core/colors';
import AppRouter from './routes';

const appTheme: Theme = createMuiTheme({
  shape: {
    borderRadius: 8
  },
  palette: {
    type: 'dark',
    primary: {
      light: blueGrey[600],
      main: blueGrey[800],
      dark: blueGrey[900]
    },
    secondary: deepOrange,
    background: {
      default: grey[800],
      paper: grey.A700
    }
  },
  typography: {
    fontFamily: 'Nunito, "Helvetica Neue", sans-serif',
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      color: grey[50],
      fontWeight: 'bolder'
    },
    h2: {
      color: grey[50],
      fontWeight: 'bolder'
    },
    h3: {
      color: grey[100],
      fontWeight: 'bolder'
    },
    body1: {
      color: grey.A700
    },
    body2: {
      color: deepOrange.A400
    },
    caption: {
      color: deepOrange.A400
    }
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
