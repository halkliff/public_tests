import { takeLatest } from 'redux-saga/effects';
import client from './client';
import { ActionTypes } from '../ducks/client';

export default function*() {
  yield takeLatest(ActionTypes.PRELOAD, client);
}
