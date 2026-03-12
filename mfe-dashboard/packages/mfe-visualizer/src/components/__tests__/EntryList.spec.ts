import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import EntryList from "../EntryList.vue";
import type { FormEntry } from "@shared/src/types";

vi.mock("@/utilities/formatTimestamp", () => ({
  formatTimestamp: (iso: string) => `formatted:${iso}`,
}));

const entries: FormEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-02T10:00:00Z",
    name: "Effie",
    country: "GR",
    profession: "Engineer",
    height: 160,
    favoriteColor: "yellow",
    favoriteMovie: "Inception",
  },
  {
    id: "2",
    timestamp: "2024-01-01T10:00:00Z",
    name: "Sevi",
    country: "CY",
    profession: "Designer",
    height: 168,
    favoriteColor: "green",
    favoriteMovie: "La la land",
  },
];

describe("EntryList", () => {
  describe("rendering", () => {
    it("matches snapshot with entries", () => {
      const wrapper = shallowMount(EntryList, {
        props: { entries },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("matches snapshot with empty entries", () => {
      const wrapper = shallowMount(EntryList, {
        props: { entries: [] },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("list items", () => {
    it("renders one list item per entry", () => {
      const wrapper = shallowMount(EntryList, {
        props: { entries },
      });
      expect(wrapper.findAll('[role="listitem"]')).toHaveLength(2);
    });

    it("renders no list items when entries is empty", () => {
      const wrapper = shallowMount(EntryList, {
        props: { entries: [] },
      });
      expect(wrapper.findAll('[role="listitem"]')).toHaveLength(0);
    });
  });

  describe("country label resolution", () => {
    it("resolves country code to label", () => {
      const wrapper = shallowMount(EntryList, {
        props: { entries: [entries[0]] },
      });
      expect(wrapper.text()).toContain("Greece");
    });

    it("falls back to raw code for unknown country", () => {
      const entry: FormEntry = {
        ...entries[0],
        id: "3",
        country: "XX",
      };
      const wrapper = shallowMount(EntryList, {
        props: { entries: [entry] },
      });
      expect(wrapper.text()).toContain("XX");
    });
  });
});
