import React from 'react';
import '../bootstrap.css';
import '../main.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import * as axiosInstance from '../API/axiosInstance';
import router from './router';
//! RTK Store
import store from './store';
//! inject Store
axiosInstance.injectStore(store);

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
