import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import logger from "redux-logger";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { userReducer } from "../reducer";
const appReducer = combineReducers({
  user: userReducer.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};


const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof appReducer>;

export const persistor = persistStore(store);
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
