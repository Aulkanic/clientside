import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import loginReducer from './loginSlice'
import formReducer from './formSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from "redux-persist/lib/storage/session";
import logger from "redux-logger";

const persistConfig = {
    key:'root',
    storage
}

const rootReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
    form: formReducer
  });
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store;