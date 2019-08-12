import { Reducer } from "redux";
import { createReducer } from "reduxsauce";
import { PhoneData } from "services/phone-data.service";

/**
 * Action Types for manipulating phone data in the store
 */
export enum ActionTypes {
  ADD = "phoneData/ADD",
  EDIT = "phoneData/EDIT",
  DELETE = "phoneData/DELETE"
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
    let payload!: PhoneTransactionType;
    payload = action.payload;
    return state.map(transaction =>
      transaction.id === payload.id ? payload : transaction
    );
  } else return state;
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
  [ActionTypes.EDIT]: edit,
  [ActionTypes.DELETE]: remove
};

export default createReducer(INITIAL_STATE, HANDLERS);

/**
 * Type annotation for the Creators, to make easier to use thorough the development.
 */
interface CREATORS_OBJ {
  add: (data: PhoneTransactionType) => {};
  edit: (data: PhoneTransactionType) => {};
  remove: (id: number) => {};
}

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
  })
};
