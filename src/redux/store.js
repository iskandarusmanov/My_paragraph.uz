import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth.slice";
import categorySlice from "./products.slice";
import favoriteSlice from "./favorite.slice";
import cartSlice from "./cart.slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authSlice),
  products: persistReducer(persistConfig, categorySlice),
  favorite: persistReducer(persistConfig, favoriteSlice),
  cart: persistReducer(persistConfig, cartSlice)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
