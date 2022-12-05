import { configureStore } from '@reduxjs/toolkit';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

//! imp rootReducer
import rootReducer from './rootReducer';

// configureStore(options: ConfigureStoreOptions<any, AnyAction, [ThunkMiddleware<any, AnyAction, undefined>], [StoreEnhancer<{}, {}>]>): ToolkitStore<any, AnyAction, [ThunkMiddleware<any, AnyAction, undefined>]>
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
