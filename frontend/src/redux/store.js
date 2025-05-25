import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice.js';
import daybookReducer from '../features/daybook/daybookSlice.js';
import orgDataReducer from '../features/ledger/orgData.js';
import orgEntriesReducer from '../features/ledger/orgEntries.js';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 


const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    daybook: daybookReducer,
    orgData: orgDataReducer,
    orgEntries: orgEntriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
