import { takeEvery } from 'redux-saga/effects';
import { ActionTypes } from 'store/ducks/phoneData';
import phoneData from './phoneData';

export default function*() {
  yield takeEvery(ActionTypes.PRELOAD, phoneData);
}
