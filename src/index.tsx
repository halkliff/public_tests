import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'typeface-nunito';
import { Provider } from 'react-redux';
import numeral from 'numeral';
import store from 'store';
import App from './App';
import * as serviceWorker from './serviceWorker';

numeral.register('locale', 'br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'Mil',
    million: 'Mi',
    billion: 'Bi',
    trillion: 'Tri'
  },
  ordinal() {
    return 'º';
  },
  currency: {
    symbol: 'R$'
  }
});

numeral.locale('br');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
