import { combineReducers } from 'redux';
import client, { StateData as ClientState } from './client';

export interface GlobalState {
  client: ClientState;
}

export default combineReducers<GlobalState>({ client });
