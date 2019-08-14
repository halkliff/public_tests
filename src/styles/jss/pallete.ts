/* eslint-disable import/prefer-default-export */
import { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';

interface AppPalette {
  primaryColor: SimplePaletteColorOptions;
  secondaryColor: SimplePaletteColorOptions;
  backgroundColor: SimplePaletteColorOptions;
}

interface TypographyPalette {
  bodyColor: SimplePaletteColorOptions;
  headlineColor: SimplePaletteColorOptions;
  secondaryColor: SimplePaletteColorOptions;
  accentColor: SimplePaletteColorOptions;
}

export const appPalette: AppPalette = {
  primaryColor: {
    main: '#1565c0',
    light: '#5e92f3',
    dark: '#003c8f'
  },
  secondaryColor: {
    main: '#ff4081',
    light: '#ff79b0',
    dark: '#c60055'
  },
  backgroundColor: {
    main: '#eceff1'
  }
};

export const typographyPallete: TypographyPalette = {
  bodyColor: {
    main: '#37474f'
  },
  headlineColor: {
    main: '#102027'
  },
  secondaryColor: {
    main: '#718792'
  },
  accentColor: {
    main: '#1565c0'
  }
}
