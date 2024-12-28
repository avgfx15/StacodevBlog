import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './User/UserSlice';

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { themeReducer } from './Theme/ThemeSlice';
import { postReducer } from './Post/PostSlice';
import { commentReducer } from './Comment/CommentSlice';

const rootReducer = combineReducers({
  userReducer,
  themeReducer,
  postReducer,
  commentReducer,
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
