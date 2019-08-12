import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './ducks';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleware.run(rootSagas);

export default store;
