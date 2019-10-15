import { combineReducers } from 'redux';
import phoneData, { StateData as PhoneStateData } from './phoneData';

export interface GlobalState {
  phoneData: PhoneStateData;
}

export default combineReducers<GlobalState>({
  phoneData
});
