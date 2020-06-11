import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';
import api from '../services/api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, rootReducer);
// const reducer = persistReducer(persistConfig, {});

const configureStore = (initialState) => {
  const middlewares = [thunkMiddleware.withExtraArgument(api)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const enhancer = compose(applyMiddleware(...middlewares));

  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});
const persistor = persistStore(store);
// persistor.purge();
export { store, persistor };
