import React, { useEffect, FunctionComponent } from 'react';
import './App.scss';
import AppRouter from 'routes';
import { Creators } from 'store/ducks/phoneData';
import { useDispatch } from 'react-redux';

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.preload());
    return () => {};
  });
  return <AppRouter />;
};

export default App;
