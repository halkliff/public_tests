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
    type: 'light',
    primary: blueGrey,
    secondary: deepOrange,
    background: {
      default: '#fafff5'
    }
  },
  typography: {
    fontFamily: 'Nunito, "Helvetica Neue", sans-serif',
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      color: grey[900],
      fontWeight: 'bolder'
    },
    h2: {
      color: grey[900],
      fontWeight: 'bolder'
    },
    h3: {
      color: grey[900],
      fontWeight: 'bolder'
    },
    body1: {
      color: grey[700]
    },
    body2: {
      color: deepOrange[500]
    },
    caption: {
      color: deepOrange[500]
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
