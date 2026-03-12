import { describe, it, expect } from "vitest";
import {
  formEntriesReducer,
  addEntry,
  removeEntry,
  clearEntries,
  getAllEntries,
  getEntryCount,
  getEntriesSorted,
} from "../store/formEntriesSlice";
import type { FormEntry } from "@shared/src/types";

const entry1: FormEntry = {
  id: "1",
  timestamp: "2024-01-01T10:00:00Z",
  name: "Effie",
  country: "Greece",
  profession: "Engineer",
  height: 170,
  favoriteColor: "red",
  favoriteMovie: "Inception",
};

const entry2: FormEntry = {
  id: "2",
  timestamp: "2024-01-02T10:00:00Z",
  name: "Sevi",
  country: "Cyprus",
  profession: "Architect",
  height: 185,
  favoriteColor: "green",
  favoriteMovie: "La la land",
};

const entry3: FormEntry = {
  id: "3",
  timestamp: "2023-12-31T10:00:00Z",
  name: "Effie",
  country: "CY",
  profession: "Teacher",
  height: 175,
  favoriteColor: "black",
  favoriteMovie: "Interstellar",
};

const createState = (entries: FormEntry[] = []) => ({
  formEntries: { entries },
});

describe("formEntriesSlice reducer", () => {
  describe("addEntry", () => {
    it("should add a new entry to the state", () => {
      const state = { entries: [] };

      const nextState = formEntriesReducer(state, addEntry(entry1));

      expect(nextState.entries).toHaveLength(1);
      expect(nextState.entries[0]).toEqual(entry1);
    });

    it("should append entries without mutating previous ones", () => {
      const state = { entries: [entry1] };

      const nextState = formEntriesReducer(state, addEntry(entry2));

      expect(nextState.entries).toHaveLength(2);
      expect(nextState.entries).toEqual([entry1, entry2]);
    });
  });

  describe("removeEntry", () => {
    it("should remove entry by id", () => {
      const state = { entries: [entry1, entry2] };

      const nextState = formEntriesReducer(state, removeEntry(entry1.id));

      expect(nextState.entries).toHaveLength(1);
      expect(nextState.entries[0]).toEqual(entry2);
    });

    it("should do nothing if id does not exist", () => {
      const state = { entries: [entry1] };

      const nextState = formEntriesReducer(state, removeEntry("non-existing"));

      expect(nextState.entries).toHaveLength(1);
      expect(nextState.entries[0]).toEqual(entry1);
    });
  });

  describe("clearEntries", () => {
    it("should remove all entries", () => {
      const state = { entries: [entry1, entry2] };

      const nextState = formEntriesReducer(state, clearEntries());

      expect(nextState.entries).toEqual([]);
    });
  });
});

describe("formEntries selectors", () => {
  describe("getAllEntries", () => {
    it("should return all entries from state", () => {
      const state = createState([entry1, entry2]);

      const result = getAllEntries(state as any);

      expect(result).toEqual([entry1, entry2]);
    });

    it("should return empty array when no entries exist", () => {
      const state = createState([]);

      const result = getAllEntries(state as any);

      expect(result).toEqual([]);
    });
  });

  describe("getEntryCount", () => {
    it("should return the number of entries", () => {
      const state = createState([entry1, entry2, entry3]);

      const result = getEntryCount(state as any);

      expect(result).toBe(3);
    });

    it("should return 0 when there are no entries", () => {
      const state = createState([]);

      const result = getEntryCount(state as any);

      expect(result).toBe(0);
    });
  });

  describe("getEntriesSorted", () => {
    it("should return entries sorted by timestamp descending", () => {
      const state = createState([entry1, entry2, entry3]);

      const result = getEntriesSorted(state as any);

      expect(result).toEqual([entry2, entry1, entry3]);
    });

    it("should not mutate the original state array", () => {
      const originalEntries = [entry1, entry2, entry3];
      const state = createState(originalEntries);

      getEntriesSorted(state as any);

      expect(state.formEntries.entries).toEqual(originalEntries);
    });

    it("should return empty array when no entries exist", () => {
      const state = createState([]);

      const result = getEntriesSorted(state as any);

      expect(result).toEqual([]);
    });
  });
});
