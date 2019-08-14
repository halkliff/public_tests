import React, { useEffect, FunctionComponent } from 'react';
import './App.scss';
import AppRouter from 'routes';
import { Creators } from 'store/ducks/phoneData';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { Theme, createMuiTheme } from '@material-ui/core/styles';
import { appPalette, typographyPallete } from 'styles/jss';

const appTheme: Theme = createMuiTheme({
  shape: {
    borderRadius: 8
  },
  palette: {
    type: 'light',
    primary: appPalette.primaryColor,
    secondary: appPalette.secondaryColor,
    background: {
      default: appPalette.backgroundColor.main
    }
  },
  typography: {
    fontFamily: 'Nunito, "Helvetica Neue", sans-serif',
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      color: typographyPallete.headlineColor.main,
      fontWeight: 'bolder'
    },
    h2: {
      color: typographyPallete.headlineColor.main,
      fontWeight: 'bolder'
    },
    h3: {
      color: typographyPallete.headlineColor.main,
      fontWeight: 'bolder'
    },
    body1: {
      color: typographyPallete.bodyColor.main
    },
    body2: {
      color: typographyPallete.secondaryColor.main
    },
    caption: {
      color: typographyPallete.secondaryColor.main
    }
  }
});

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.preload());
    return () => {};
  });
  return (
    <ThemeProvider theme={appTheme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
