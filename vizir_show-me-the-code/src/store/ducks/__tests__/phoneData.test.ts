import * as phoneData from '../phoneData';

describe('phoneData redux actions', () => {
  const CREATORS = phoneData.Creators;

  it('Should call the ADD action correctly', () => {
    const mockPayload: phoneData.PhoneTransactionType = {
      id: '1',
      callTime: 0,
      phoneData: {
        id: '1.1',
        origem: 'foo',
        destino: 'bar',
        faleMaisDisponivel: [],
        valorTransacao: 0.0
      }
    };

    const mockAction: phoneData.ActionPayload = {
      type: phoneData.ActionTypes.ADD,
      payload: mockPayload
    };

    expect(CREATORS.add(mockPayload)).toEqual(mockAction);
  });

  it('Should call the ADD_ALL action correctly', () => {
    const mockPayload: phoneData.PhoneTransactionType[] = [
      {
        id: '1',
        callTime: 0,
        phoneData: {
          id: '1.1',
          origem: 'foo',
          destino: 'bar',
          faleMaisDisponivel: [],
          valorTransacao: 0.0
        }
      }
    ];

    const mockAction: phoneData.ActionPayload = {
      type: phoneData.ActionTypes.ADD_ALL,
      payload: mockPayload
    };

    expect(CREATORS.addAll(mockPayload)).toEqual(mockAction);
  });

  it('Should call the EDIT action correctly', () => {
    const mockPayload: phoneData.PhoneTransactionType = {
      id: '1',
      callTime: 0,
      phoneData: {
        id: '1.1',
        origem: 'foo',
        destino: 'bar',
        faleMaisDisponivel: [],
        valorTransacao: 0.0
      }
    };

    const mockAction: phoneData.ActionPayload = {
      type: phoneData.ActionTypes.EDIT,
      payload: mockPayload
    };

    expect(CREATORS.edit(mockPayload)).toEqual(mockAction);
  });

  it('Should call the DELETE action correctly', () => {
    const mockAction: phoneData.ActionPayload = {
      type: phoneData.ActionTypes.DELETE,
      payload: '1'
    };

    expect(CREATORS.remove('1')).toEqual(mockAction);
  });

  it('Should call the PRELOAD action correctly', () => {
    const mockAction = {
      type: phoneData.ActionTypes.PRELOAD
    };

    expect(CREATORS.preload()).toEqual(mockAction);
  });

  it('Should call the LOADING action correctly', () => {
    const mockAction = {
      type: phoneData.ActionTypes.LOADING
    };

    expect(CREATORS.loading()).toEqual(mockAction);
  });

  it('Should call the LOADING_COMPLETE action correctly', () => {
    const mockAction = {
      type: phoneData.ActionTypes.LOADING_COMPLETE
    };

    expect(CREATORS.loaded()).toEqual(mockAction);
  });
});

describe('phoneData redux reducers', () => {
  let INITIAL_STATE: phoneData.StateData;

  const mockPayload: phoneData.PhoneTransactionType = {
    id: '1',
    callTime: 0,
    phoneData: {
      id: '1.1',
      origem: 'foo',
      destino: 'bar',
      faleMaisDisponivel: [],
      valorTransacao: 0.0
    }
  };

  beforeEach(() => {
    INITIAL_STATE = {
      transactions: [],
      loading: false,
      selectedTransaction: null
    };
  });

  const reducer = phoneData.default;

  it('should add a new phoneData to the state', () => {
    const expectedState: phoneData.StateData = {
      transactions: [mockPayload],
      loading: false,
      selectedTransaction: null
    };

    const reducedValue = reducer(
      INITIAL_STATE,
      phoneData.Creators.add(mockPayload)
    );

    expect(reducedValue).toEqual(expectedState);
    expect(reducedValue.transactions).toHaveLength(1);
  });

  it('should add two new phoneDatas to the state', () => {
    const expectedState: phoneData.StateData = {
      transactions: [mockPayload, mockPayload],
      loading: false,
      selectedTransaction: null
    };

    const reducedValue = reducer(
      INITIAL_STATE,
      phoneData.Creators.addAll([mockPayload, mockPayload])
    );

    expect(reducedValue).toEqual(expectedState);
    expect(reducedValue.transactions).toHaveLength(2);
  });

  it('should add and edit a phoneData to the state', () => {
    const expectedState: phoneData.StateData = {
      transactions: [mockPayload],
      loading: false,
      selectedTransaction: null
    };

    const reducedValue = reducer(
      INITIAL_STATE,
      phoneData.Creators.add(mockPayload)
    );

    expect(reducedValue).toEqual(expectedState);
    expect(reducedValue.transactions).toHaveLength(1);

    const editedTransaction = { ...mockPayload, callTime: 25 };

    const editedReducedValue = reducer(
      reducedValue,
      phoneData.Creators.edit(editedTransaction)
    );

    expect(editedReducedValue.transactions[0].callTime).toEqual(25);
  });

  it('should add a new phoneData to the state and delete afterwards', () => {
    const expectedState: phoneData.StateData = {
      transactions: [mockPayload],
      loading: false,
      selectedTransaction: null
    };

    const reducedValue = reducer(
      INITIAL_STATE,
      phoneData.Creators.add(mockPayload)
    );

    expect(reducedValue).toEqual(expectedState);
    expect(reducedValue.transactions).toHaveLength(1);

    const reducedDeletedValue = reducer(
      reducedValue,
      phoneData.Creators.remove(mockPayload.id)
    );

    expect(reducedDeletedValue.transactions).toHaveLength(0);
  });

  it('should add a new phoneData to the state and select it', () => {
    const expectedState: phoneData.StateData = {
      transactions: [mockPayload],
      loading: false,
      selectedTransaction: null
    };

    const reducedValue = reducer(
      INITIAL_STATE,
      phoneData.Creators.add(mockPayload)
    );

    expect(reducedValue).toEqual(expectedState);
    expect(reducedValue.transactions).toHaveLength(1);

    const selectedReducedValue = reducer(
      reducedValue,
      phoneData.Creators.select(mockPayload.id)
    );

    expect(selectedReducedValue.selectedTransaction).toEqual(mockPayload);
  });

  it('should set the state as loading', () => {
    const expectedState: phoneData.StateData = {
      transactions: [],
      loading: false,
      selectedTransaction: null
    };

    const reducedValue = reducer(expectedState, phoneData.Creators.loading());
    expect(reducedValue.loading).toEqual(true);
  });

  it('should set the state as loaded', () => {
    const expectedState: phoneData.StateData = {
      transactions: [],
      loading: true,
      selectedTransaction: null
    };

    const reducedValue = reducer(expectedState, phoneData.Creators.loaded());
    expect(reducedValue.loading).toEqual(false);
  });
});
