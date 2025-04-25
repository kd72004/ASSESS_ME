import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./services/Login.service";
import { registerApi } from "./services/Register.service";

export const store = configureStore({
  reducer: {
    [registerApi.reducerPath]:registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(registerApi.middleware),
});
setupListeners(store.dispatch);
