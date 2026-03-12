// Redux middleware that syncs state to the event bus on every change

import type { Middleware } from "@reduxjs/toolkit";
import { CryptoService, EventBus, EVENT_NAMES } from "@shared/index";
import { getAllEntries } from "./formEntriesSlice";
import type { RootState } from "./index";

export const eventBusSyncMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState() as RootState;
    const entries = getAllEntries(state);

    CryptoService.encrypt(entries).then((encrypted) => {
      EventBus.dispatch(EVENT_NAMES.ENTRIES_UPDATED, encrypted);
    });

    return result;
  };
