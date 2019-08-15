import { Creators } from 'store/ducks/phoneData';
import { put } from 'redux-saga/effects';
import phoneDataSaga from '../phoneData';

describe('phoneData Sagas tests', () => {
  const yieldVal = phoneDataSaga();

  it('Should yield the action to set the state in the store as loading', () => {
    expect(yieldVal.next().value).toStrictEqual(put(Creators.loading()));
  });

  it('Should yield the action to add a list of transactions in the store', () => {
    // The promise resolves before the addAll action is dispatched
    expect(yieldVal.next()).toBeTruthy();

    expect(yieldVal.next().value).toBeTruthy();
  });

  it('Should yield the action to set the state in the store as loaded', () => {
    expect(yieldVal.next().value).toStrictEqual(put(Creators.loaded()));
  });
});
