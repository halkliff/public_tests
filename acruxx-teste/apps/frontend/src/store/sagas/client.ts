import { put } from 'redux-saga/effects';
import { Client } from '@cacdigital-lib/types';
import { Creators } from '../ducks/client';
import ClientService from '../../services/client';

export default function*() {
  yield put(Creators.loading());
  const payload: { qty: number; clients: Client[] } = { qty: 0, clients: [] };
  const service = ClientService.instance;

  yield service.getClients().then(response => {
    if (response.ok && response.data)
      response.data.forEach((data: Client) =>
        payload.clients.push({ ...data })
      );
    payload.qty = response.qty;
  });

  yield put(Creators.addAll(payload));
  yield put(Creators.loaded());
}
