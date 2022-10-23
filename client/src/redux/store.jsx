import { configureStore } from "@reduxjs/toolkit";
import callActiveReducer from "./callreducer";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    callActive: callActiveReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
