import { put } from 'redux-saga/effects';
import { Creators, PhoneTransactionType } from 'store/ducks/phoneData';
import PhoneDataService, { PhoneData } from 'services/phone-data.service';

export default function*(/* action: ActionPayload */) {
  yield put(Creators.loading());
  const transactionTypes: PhoneTransactionType[] = [];

  yield PhoneDataService.fetch().then(phoneData => {
    phoneData.forEach((data: PhoneData) =>
      transactionTypes.push({
        id: data.id,
        phoneData: data,
        callTime: 0
      })
    );
  });

  yield put(Creators.addAll(transactionTypes));
  yield put(Creators.loaded());
}
