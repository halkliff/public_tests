import React, { FunctionComponent } from 'react';
/* import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  StateData,
  Creators as PhoneCreators,
  ActionPayload as PhoneActionPayload
} from 'store/ducks/phoneData';
import { GlobalState } from 'store/ducks'; */
import Selector from 'components/Selector';

const Main: FunctionComponent = () => {
  /* const phoneData = useSelector<GlobalState, StateData>(
    state => state.phoneData
  ); */
  return (
    <>
      <Selector />
    </>
  );
};

export default Main;
