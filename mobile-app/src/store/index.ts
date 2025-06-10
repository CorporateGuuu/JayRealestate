import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

// Slices
import propertiesSlice from './slices/propertiesSlice';
import userSlice from './slices/userSlice';
import appSlice from './slices/appSlice';

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'app'], // Only persist user and app state
};

const rootReducer = combineReducers({
  properties: propertiesSlice,
  user: userSlice,
  app: appSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
