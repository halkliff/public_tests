import { combineReducers } from 'redux';

export interface GlobalState {
  [key: string]: any;
}

export default combineReducers<GlobalState>({});
