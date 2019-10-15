import { Reducer, Action } from 'redux';
import { createReducer } from 'reduxsauce';
import { PhoneData } from 'services/phone-data.service';

/**
 * Action Types for manipulating phone data in the store
 */
export enum ActionTypes {
  ADD = 'phoneData/ADD',
  ADD_ALL = 'phoneData/ADD_ALL',
  SELECT = 'phoneData/SELECT',
  EDIT = 'phoneData/EDIT',
  DELETE = 'phoneData/DELETE',
  PRELOAD = 'phoneData/PRELOAD',
  LOADING = 'phoneData/LOADING',
  LOADING_COMPLETE = 'phoneData/LOADING_COMPLETE'
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
export interface PhoneTransactionType {
  id: string;
  phoneData: PhoneData;
  callTime: number;
}

export interface StateData {
  transactions: PhoneTransactionType[];
  loading: boolean;
  selectedTransaction?: PhoneTransactionType | null;
}

const INITIAL_STATE: StateData = {
  transactions: [],
  loading: false,
  selectedTransaction: null
};

/**
 * Handler to add a new transaction type to the store
 * @param state the previous state of the store
 * @param action the add action. This action contains in its `payload` the
 *               [PhoneTransactionType] object to be added to the store.
 */
export const add: Reducer<StateData, ActionPayload<PhoneTransactionType>> = (
  state = INITIAL_STATE,
  action
) => {
  const { transactions } = state;
  if (action.payload) {
    transactions.push(action.payload);
  }
  return { ...state, transactions };
};

/**
 * Handler to add an iterable of transaction types to the store.
 * @param state the previous state of the store
 * @param action the add action. This action contains in its `payload` the
 *               [PhoneTransactionType] iterable to be joined to the store.
 */
export const addAll: Reducer<
  StateData,
  ActionPayload<PhoneTransactionType[]>
> = (state = INITIAL_STATE, action) => {
  const { transactions } = state;
  if (action.payload) {
    transactions.push(...action.payload);
  }
  return { ...state, transactions };
};

export const select: Reducer<StateData, ActionPayload<string>> = (
  state = INITIAL_STATE,
  action
) => {
  const selectedTransaction = state.transactions.find(
    value => value.id === action.payload
  );

  return {
    ...state,
    selectedTransaction: selectedTransaction || null
  };
};

/**
 * Handler to edit a transaction type saved in the store.
 * @param state the previous state of the store
 * @param action The edit action. This action contains in its `payload` the
 *               [PhoneTransactionType] object to replace one in the store. This object
 *               must exist in the store, otherwise the edit will be ignored.
 */
export const edit: Reducer<StateData, ActionPayload<PhoneTransactionType>> = (
  state = INITIAL_STATE,
  action
) => {
  // All of this just to make Typescript shut up...
  if (action.payload) {
    const { transactions } = state;
    const { payload } = action;
    const newTransactions = transactions.map(transaction =>
      transaction.id === payload.id ? payload : transaction
    );
    return { ...state, transactions: newTransactions };
  }
  return state;
};

/**
 * Handler to remove a transaction type saved in the store.
 * @param state the previous state of the store
 * @param action the remove action. this action contains in its `payload` the
 *               `id`, which refers to one [PhoneTransactionType] saved in the store.
 */
export const remove: Reducer<StateData, ActionPayload<string>> = (
  state = INITIAL_STATE,
  action
) => {
  const { transactions } = state;
  if (action.payload) {
    const newTransactions = transactions.filter(
      transaction => transaction.id !== action.payload
    );
    return { ...state, transactions: newTransactions };
  }
  return state;
};

/**
 * The next two functions serve for the sole purpose of telling that a call to the
 * database is being made, and thus new data is being loaded.
 */

export const loading: Reducer<StateData, Action<ActionTypes>> = (
  state = INITIAL_STATE,
  action
) => {
  if (action) {
    return { ...state, loading: true };
  }
  return state;
};

export const loaded: Reducer<StateData, Action<ActionTypes>> = (
  state = INITIAL_STATE,
  action
) => {
  if (action) {
    return { ...state, loading: false };
  }
  return state;
};

/**
 * Reducer handlers
 */
export const HANDLERS = {
  [ActionTypes.ADD]: add,
  [ActionTypes.ADD_ALL]: addAll,
  [ActionTypes.EDIT]: edit,
  [ActionTypes.SELECT]: select,
  [ActionTypes.DELETE]: remove,
  [ActionTypes.LOADING]: loading,
  [ActionTypes.LOADING_COMPLETE]: loaded
};

export default createReducer<StateData, Action<any> | ActionPayload<any>>(
  INITIAL_STATE,
  HANDLERS
);

/**
 * Type annotation for the Creators, to make easier to use thorough the development.
 */
interface CreatorsObj {
  add: (data: PhoneTransactionType) => ActionPayload;
  addAll: (data: PhoneTransactionType[]) => ActionPayload;
  edit: (data: PhoneTransactionType) => ActionPayload;
  select: (id: string) => ActionPayload;
  remove: (id: string) => ActionPayload;
  preload: () => ActionPayload;
  loading: () => Action;
  loaded: () => Action;
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
    payload: { ...data }
  }),
  /**
   * Adds an iterable of transaction types in the store, passing the `data` param, which is
   * of the type [Array<PhoneTransactionType>]
   */
  addAll: data => ({
    type: ActionTypes.ADD_ALL,
    payload: [...data]
  }),

  /**
   * Edits a transaction type in the store, passing the `data` param, which is of
   * the type [PhoneTransactionType].
   */
  edit: data => ({
    type: ActionTypes.EDIT,
    payload: { ...data }
  }),

  /**
   * Selects a transaction type in the store, passing the `data` param, which is of
   * the type [PhoneTransactionType].
   */
  select: id => ({
    type: ActionTypes.SELECT,
    payload: id
  }),

  /**
   * Removes a new transaction type in the store, passing the `id` param.
   */
  remove: (id: string) => ({
    type: ActionTypes.DELETE,
    payload: id
  }),
  /**
   * Loads the transaction types saved on the server.
   */
  preload: () => ({
    type: ActionTypes.PRELOAD
  }),
  /**
   * The next two functions serve for the sole purpose of telling that a call to the
   * database is being made, and thus new data is being loaded.
   */
  loading: () => ({
    type: ActionTypes.LOADING
  }),
  loaded: () => ({
    type: ActionTypes.LOADING_COMPLETE
  })
};
