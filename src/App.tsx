import React from 'react';
import './App.scss';
import AppRouter from 'routes';
import { Provider } from 'react-redux';

import store from './store';

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
