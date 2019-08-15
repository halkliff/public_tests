import { takeEvery } from 'redux-saga/effects';
import { ActionTypes } from 'store/ducks/phoneData';
import rootSagas from '..';
import phoneDataSaga from '../phoneData';

describe('Root Sagas tests', () => {
  it('should yield the phoneData saga and action from it', () => {
    const val = rootSagas();

    expect(val.next().value).toEqual(
      takeEvery(ActionTypes.PRELOAD, phoneDataSaga)
    );
  });
});
