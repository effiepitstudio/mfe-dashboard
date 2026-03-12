import { describe, it, expect, vi } from "vitest";

vi.mock("@shared/src/index", () => ({
  CryptoService: { encrypt: vi.fn().mockResolvedValue({ ciphertext: "", iv: "" }) },
  EventBus: { dispatch: vi.fn(), subscribe: vi.fn() },
  EVENT_NAMES: {
    ENTRIES_UPDATED: "mfe:entries-updated",
    ENTRIES_REQUESTED: "mfe:entries-requested",
  },
}));

import { createFormStore } from "../store";
import { addEntry, clearEntries, getAllEntries } from "../store/formEntriesSlice";
import type { FormEntry } from "@shared/src/types";

const entry: FormEntry = {
  id: "1",
  timestamp: "2024-01-01T10:00:00Z",
  name: "Effie",
  country: "GR",
  profession: "Engineer",
  height: 160,
  favoriteColor: "yellow",
  favoriteMovie: "Inception",
};

describe("createFormStore", () => {
  it("creates a store with empty initial state", () => {
    const store = createFormStore();
    expect(getAllEntries(store.getState())).toEqual([]);
  });

  it("handles addEntry action", () => {
    const store = createFormStore();
    store.dispatch(addEntry(entry));
    expect(getAllEntries(store.getState())).toEqual([entry]);
  });

  it("handles clearEntries action", () => {
    const store = createFormStore();
    store.dispatch(addEntry(entry));
    store.dispatch(clearEntries());
    expect(getAllEntries(store.getState())).toEqual([]);
  });

  it("creates independent store instances", () => {
    const store1 = createFormStore();
    const store2 = createFormStore();
    store1.dispatch(addEntry(entry));
    expect(getAllEntries(store1.getState())).toHaveLength(1);
    expect(getAllEntries(store2.getState())).toHaveLength(0);
  });
});
