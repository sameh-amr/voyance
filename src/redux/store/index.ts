import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import logger from "redux-logger";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { userReducer } from "../reducer";

//create all the slice for our redux store to be able to axis thise slices
const appReducer = combineReducers({
  user: userReducer.reducer,
});

//the persist configurations for redux store where storage is the local store of the browser (enabling caching)
const persistConfig = {
  key: "root",
  storage,
};

//a function to configure the persistance and persist values of the app reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

//configuring the store with the previous values
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

//to get the dispatch type from the store
export type AppDispatch = typeof store.dispatch;
//to get the store types and be able to access it later and run type checking
export type RootState = ReturnType<typeof appReducer>;

//a function from redux to persist our store values to be used in provider
export const persistor = persistStore(store);

//those are typescripting for use app dispatch ad selector instead of re creating them in every component and defining the type once again
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
