import { Reducer } from 'redux';
import { createReducer } from 'reduxsauce';
import { PhoneData } from 'services/phone-data.service';

/**
 * Action Types for manipulating phone data in the store
 */
export enum ActionTypes {
  ADD = 'phoneData/ADD',
  ADD_ALL = 'phoneData/ADD_ALL',
  EDIT = 'phoneData/EDIT',
  DELETE = 'phoneData/DELETE',
  PRELOAD = 'phoneData/PRELOAD'
}

/**
 * The action payload type for the reducers
 */
export interface ActionPayload<T = any> {
  type: ActionTypes;
  payload?: T;
}

/**
 * The expected transaction type for the application
 */
interface PhoneTransactionType {
  id: number;
  phoneData: PhoneData;
  callTime: number;
}

export type StateData = PhoneTransactionType[];

const INITIAL_STATE: StateData = [];

/**
 * Handler to add a new transaction type to the store
 * @param state the previous state of the store
 * @param action the add action. This action contains in its `payload` the
 *               [PhoneTransactionType] object to be added to the store.
 */
export const add: Reducer = (
  state: StateData = INITIAL_STATE,
  action: ActionPayload<PhoneTransactionType>
) => (action.payload ? [...state, action.payload] : state);

/**
 * Handler to add an iterable of transaction types to the store.
 * @param state the previous state of the store
 * @param action the add action. This action contains in its `payload` the
 *               [PhoneTransactionType] iterable to be joined to the store.
 */
export const addAll: Reducer = (
  state: StateData = INITIAL_STATE,
  action: ActionPayload<PhoneTransactionType[]>
) => (action.payload ? [...state, ...action.payload] : state);

/**
 * Handler to edit a transaction type saved in the store.
 * @param state the previous state of the store
 * @param action The edit action. This action contains in its `payload` the
 *               [PhoneTransactionType] object to replace one in the store. This object
 *               must exist in the store, otherwise the edit will be ignored.
 */
export const edit: Reducer = (
  state: StateData = INITIAL_STATE,
  action: ActionPayload<PhoneTransactionType>
) => {
  // All of this just to make Typescript shut up...
  if (action.payload !== undefined) {
    const { payload } = action;
    return state.map(transaction =>
      transaction.id === payload.id ? payload : transaction
    );
  }
  return state;
};

/**
 * Handler to remove a transaction type saved in the store.
 * @param state the previous state of the store
 * @param action the remove action. this action contains in its `payload` the
 *               `id`, which refers to one [PhoneTransactionType] saved in the store.
 */
export const remove: Reducer = (
  state: StateData = INITIAL_STATE,
  action: ActionPayload<number>
) => {
  return action.payload
    ? state.filter(transaction => transaction.id !== action.payload)
    : state;
};

/**
 * Reducer handlers
 */
export const HANDLERS = {
  [ActionTypes.ADD]: add,
  [ActionTypes.ADD_ALL]: addAll,
  [ActionTypes.EDIT]: edit,
  [ActionTypes.DELETE]: remove
};

export default createReducer(INITIAL_STATE, HANDLERS);

/**
 * Type annotation for the Creators, to make easier to use thorough the development.
 */
interface CreatorsObj {
  add: (data: PhoneTransactionType) => ActionPayload;
  addAll: (data: PhoneTransactionType[]) => ActionPayload;
  edit: (data: PhoneTransactionType) => ActionPayload;
  remove: (id: number) => ActionPayload;
  preload: () => ActionPayload;
}

export type CREATORS_OBJ = CreatorsObj;

/**
 * Creators object.
 * This object contains actions that will trigger the reducers to edit data in the store.
 */
export const Creators: CREATORS_OBJ = {
  /**
   * Adds a new transaction type in the store, passing the `data` param, which is of
   * the type [PhoneTransactionType].
   */
  add: data => ({
    type: ActionTypes.ADD,
    payload: { data }
  }),
  /**
   * Adds an iterable of transaction types in the store, passing the `data` param, which is
   * of the type [Array<PhoneTransactionType>]
   */
  addAll: data => ({
    type: ActionTypes.ADD_ALL,
    payload: { data }
  }),

  /**
   * Edits a transaction type in the store, passing the `data` param, which is of
   * the type [PhoneTransactionType].
   */
  edit: data => ({
    type: ActionTypes.EDIT,
    payload: { data }
  }),

  /**
   * Removes a new transaction type in the store, passing the `id` param.
   */
  remove: (id: number) => ({
    type: ActionTypes.DELETE,
    payload: { id }
  }),
  /**
   * Loads the transaction types saved on the server.
   */
  preload: () => ({
    type: ActionTypes.PRELOAD
  })
};
