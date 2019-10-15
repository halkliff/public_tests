import { Reducer, Action } from 'redux';
import { createReducer } from 'reduxsauce';
import { Client } from '@cacdigital-lib/types';

/**
 * Action Types for manipulating phone data in the store
 */
export enum ActionTypes {
  ADD = 'client/ADD',
  ADD_ALL = 'client/ADD_ALL',
  SELECT = 'client/SELECT',
  SELECT_REMOTE = 'client/SELECT_REMOTE',
  EDIT = 'client/EDIT',
  // EDIT_REMOTE = 'client/EDIT_REMOTE',
  DELETE = 'client/DELETE',
  PRELOAD = 'client/PRELOAD',
  LOADING = 'client/LOADING',
  LOADING_COMPLETE = 'client/LOADING_COMPLETE'
}

/**
 * The action payload type for the reducers
 */
export interface ActionPayload<T = any> {
  type: ActionTypes;
  payload?: T;
}

export interface StateData {
  clients: Client[];
  loading: boolean;
  selectedClient?: Client | null | Partial<Client>;
  qty: number;
}

const INITIAL_STATE: StateData = {
  clients: [],
  loading: false,
  selectedClient: null,
  qty: 0
};

/**
 * Handler to add a new client to the store
 * @param state the previous state of the store
 * @param action the add action. This action contains in its `payload` the
 *               [Client] object to be added to the store.
 */
export const add: Reducer<StateData, ActionPayload<Client>> = (
  state = INITIAL_STATE,
  action
) => {
  const { clients } = state;
  let { qty } = state;
  if (action.payload) {
    clients.push(action.payload);
    qty += 1;
  }
  return { ...state, clients, qty };
};

/**
 * Handler to add an iterable of clients to the store.
 * @param state the previous state of the store
 * @param action the add action. This action contains in its `payload` the
 *               [Client] iterable to be joined to the store.
 */
export const addAll: Reducer<
  StateData,
  ActionPayload<{ qty: number; clients: Client[] }>
> = (state = INITIAL_STATE, action) => {
  const { clients } = state;
  let { qty } = state;
  if (action.payload) {
    clients.push(...action.payload.clients);
    qty = action.payload.qty;
  }
  return { ...state, clients, qty };
};

/**
 * Handler to select a client (mostly for editing).
 * @param state The previous state of the store
 * @param action the select action. This action contains in its `payload` the
 *               [Client]'s document to find and select.
 */
export const select: Reducer<StateData, ActionPayload<string>> = (
  state = INITIAL_STATE,
  action
) => {
  const selectedClient = state.clients.find(
    value => value.document === action.payload
  );

  return {
    ...state,
    selectedClient: selectedClient || null
  };
};

/**
 * Handler to select a client, with data coming directly from the server.
 * @param state the previous state of the store
 * @param action the select action. This action contains in its `payload` the [Client] that came
 *               from the server.
 */
export const selectRemote: Reducer<StateData, ActionPayload<Client>> = (
  state = INITIAL_STATE,
  action
) => {
  const selectionExists = state.clients.find(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    value => value.document === action.payload!.document
  );

  if (!selectionExists) {
    const { qty } = state;

    return { ...state, qty: qty + 1, selectedClient: action.payload || null };
  }
  return { ...state, selectedClient: selectionExists || null };
};

/**
 * Handler to edit a client saved in the store.
 * @param state the previous state of the store
 * @param action The edit action. This action contains in its `payload` the
 *               [Client] object to replace one in the store. This object
 *               must exist in the store, otherwise the edit will be ignored.
 */
export const edit: Reducer<StateData, ActionPayload<Client>> = (
  state = INITIAL_STATE,
  action
) => {
  // All of this just to make Typescript shut up...
  if (action.payload) {
    const { clients } = state;
    const { payload } = action;
    const newTransactions = clients.map(client =>
      client.document === payload.document ? payload : client
    );
    return { ...state, transactions: newTransactions };
  }
  return state;
};

/* export const editRemote: Reducer<StateData, ActionPayload<Client>> = (
  state = INITIAL_STATE,
  action
) => {
  if (action.payload) {
    const { clients } = state;
    const { payload } = action;
    const editExists = clients.find(
      client => client.document === payload.document
    );
    if (editExists) {
      return edit(state, action);
    }
    return add(state, action);
  }
  return state;
}; */

/**
 * Handler to remove a client saved in the store.
 * @param state the previous state of the store
 * @param action the remove action. this action contains in its `payload` the
 *               `document`, which refers to one [Client] saved in the store.
 */
export const remove: Reducer<StateData, ActionPayload<string>> = (
  state = INITIAL_STATE,
  action
) => {
  const { clients } = state;
  let { qty } = state;
  if (action.payload) {
    const newClients = clients.filter(
      client => client.document !== action.payload
    );
    qty -= 1;
    return { ...state, clients: newClients, qty };
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
  [ActionTypes.SELECT_REMOTE]: selectRemote,
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
  add: (data: Client) => ActionPayload;
  addAll: (data: { qty: number; clients: Client[] }) => ActionPayload;
  edit: (data: Client) => ActionPayload;
  select: (id: string) => ActionPayload;
  selectRemote: (data: Client) => ActionPayload;
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
   * the type [Client].
   */
  add: data => ({
    type: ActionTypes.ADD,
    payload: { ...data }
  }),
  /**
   * Adds an iterable of transaction types in the store, passing the `data` param, which is
   * of the type [Array<Client>]
   */
  addAll: data => ({
    type: ActionTypes.ADD_ALL,
    payload: { ...data }
  }),

  /**
   * Edits a transaction type in the store, passing the `data` param, which is of
   * the type [Client].
   */
  edit: data => ({
    type: ActionTypes.EDIT,
    payload: { ...data }
  }),

  /**
   * Selects a transaction type in the store, passing the `data` param, which is of
   * the type [Client].
   */
  select: id => ({
    type: ActionTypes.SELECT,
    payload: id
  }),

  selectRemote: data => ({
    type: ActionTypes.SELECT_REMOTE,
    payload: { ...data }
  }),

  /**
   * Removes a new transaction type in the store, passing the `document` param.
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
