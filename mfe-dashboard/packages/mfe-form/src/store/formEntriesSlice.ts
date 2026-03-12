// Actions & getters

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormEntry } from "@shared/types";
import type { RootState } from ".index";

interface FormEntriesState {
  entries: FormEntry[];
}

const initialState: FormEntriesState = {
  entries: [],
};

const formEntriesSlice = createSlice({
  name: "formEntries",
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<FormEntry>) {
      state.entries.push(action.payload);
    },
    removeEntry(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload,
      );
    },
    clearEntries(state) {
      state.entries = [];
    },
  },
});

export const { addEntry, removeEntry, clearEntries } = formEntriesSlice.actions;

export const formEntriesReducer = formEntriesSlice.reducer;

export const getAllEntries = (state: RootState): FormEntry[] =>
  state.formEntries.entries;

export const getEntryCount = (state: RootState): number =>
  state.formEntries.entries.length;

export const getEntriesSorted = (state: RootState): FormEntry[] =>
  [...state.formEntries.entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
