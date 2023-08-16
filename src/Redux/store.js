import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import loginReducer from './loginSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
    key:'root',
    storage
}

const rootReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
  });
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
export default store;