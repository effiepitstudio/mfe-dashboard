// Redux store for MFE-form

import { configureStore } from "@reduxjs/toolkit";
import { formEntriesReducer } from "./formEntriesSlice";
import { eventBusSyncMiddleware } from "./eventBusSyncMiddleware";

export const createFormStore = () =>
  configureStore({
    reducer: {
      formEntries: formEntriesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(eventBusSyncMiddleware),
  });

export type FormStore = ReturnType<typeof createFormStore>;
export type RootState = ReturnType<FormStore["getState"]>;
export type AppDispatch = FormStore["dispatch"];
