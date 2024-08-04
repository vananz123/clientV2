import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./feature/cart/reducer";
import cateReducer from "./feature/category/reducer";
import userReducer from "./feature/user/reducer";
import orderStatusReducer from "./feature/order-status/reducer";
const persistConfig = {
  key: "la-store-website",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  cart:cartReducer,
  categories:cateReducer,
  user:userReducer,
  orderStatus:orderStatusReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export let store = createStore();

export const persistor = persistStore(store);

export const refreshStore = () => {
  store = createStore();
};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;