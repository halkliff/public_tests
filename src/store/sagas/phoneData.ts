import { put } from 'redux-saga/effects';
import { Creators, PhoneTransactionType } from 'store/ducks/phoneData';
import PhoneDataService, { PhoneData } from 'services/phone-data.service';

export default function*(/* action: ActionPayload */) {
  yield put(Creators.loading());
  const phoneData: PhoneData[] = yield PhoneDataService.fetch();
  const transactionTypes: PhoneTransactionType[] = [];

  phoneData.forEach(data =>
    transactionTypes.push({
      id: data.id,
      phoneData: data,
      callTime: 0
    })
  );

  yield put(Creators.addAll(transactionTypes));
  yield put(Creators.loaded());
}
