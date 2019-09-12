import { takeEvery } from 'redux-saga/effects';

export default function*() {
  yield takeEvery({ take: () => {} }, () => {});
}
