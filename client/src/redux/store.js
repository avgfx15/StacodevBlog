import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './User/UserSlice';

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { themeReducer } from './Theme/ThemeSlice';
import { postReducer } from './Post/PostSlice';

const rootReducer = combineReducers({
  userReducer,
  themeReducer,
  postReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
