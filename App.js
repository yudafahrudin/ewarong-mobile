import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './app/stores';
import AppContainer from './AppContainer';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default App;
