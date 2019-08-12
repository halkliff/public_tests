import { put } from 'redux-saga/effects';
import { ActionPayload, Creators } from 'store/ducks/phoneData';

export default function*(/* action: ActionPayload */) {
  yield put<ActionPayload>(Creators.addAll([]));
}
