import React from 'react';
import '../bootstrap.css';
import '../main.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { injectStore } from '../API/axiosInstance';

//! router
import router from './router';

//! store
import store from './store';
//! inject store to axiosInstance
injectStore(store);

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
