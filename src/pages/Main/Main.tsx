import React, { useEffect, FunctionComponent } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  StateData,
  Creators as PhoneCreators,
  ActionPayload as PhoneActionPayload
} from 'store/ducks/phoneData';

const Main: FunctionComponent = () => {
  const phoneData: StateData = useSelector<StateData, StateData>(
    state => state
  );

  const dispatch = useDispatch<Dispatch<PhoneActionPayload>>();

  useEffect(() => {
    if (phoneData.length < 1) {
      dispatch(PhoneCreators.preload());
    }
    return () => {};
  }, [dispatch, phoneData.length]);
  return <div />;
};

export default Main;
