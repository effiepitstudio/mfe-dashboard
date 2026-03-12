// Redux middleware that syncs state to the event bus on every change

import type { Middleware } from "@reduxjs/toolkit";
import { CryptoService, EventBus, EVENT_NAMES } from "@shared/src/index";
import { getAllEntries } from "./formEntriesSlice";
import type { RootState } from "./index";

function broadcastEntries(store: { getState: () => unknown }): void {
  const state = store.getState() as RootState;
  const entries = getAllEntries(state);
  CryptoService.encrypt(entries).then((encrypted: { ciphertext: string; iv: string }) => {
    EventBus.dispatch(EVENT_NAMES.ENTRIES_UPDATED, encrypted);
  });
}

export const eventBusSyncMiddleware: Middleware =
  (store) => {
    // Respond to requests from other MFEs (e.g. visualizer on mount)
    EventBus.subscribe(EVENT_NAMES.ENTRIES_REQUESTED, () => {
      broadcastEntries(store);
    });

    return (next) => (action) => {
      const result = next(action);
      broadcastEntries(store);
      return result;
    };
  };
