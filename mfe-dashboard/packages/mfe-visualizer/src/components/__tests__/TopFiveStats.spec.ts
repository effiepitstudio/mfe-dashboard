import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TopFiveStats from "../TopFiveStats.vue";
import type { FormEntry } from "@shared/src/types";

vi.mock("@/utilities/statsHelpers", () => ({
  computeTopFivePerField: vi.fn(() => [
    {
      fieldLabel: "Country",
      items: [
        { value: "Greece", count: 3 },
        { value: "Cyprus", count: 2 },
      ],
    },
    {
      fieldLabel: "Profession",
      items: [{ value: "Engineer", count: 5 }],
    },
  ]),
}));

const entries: FormEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-01T10:00:00Z",
    name: "Effie",
    country: "GR",
    profession: "Engineer",
    height: 160,
    favoriteColor: "yellow",
    favoriteMovie: "Inception",
  },
];

describe("TopFiveStats", () => {
  describe("rendering", () => {
    it("matches snapshot", () => {
      const wrapper = shallowMount(TopFiveStats, {
        props: { entries },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("structure", () => {
    it("renders a section per field", () => {
      const wrapper = shallowMount(TopFiveStats, {
        props: { entries },
      });
      const headings = wrapper.findAll("h4");
      expect(headings).toHaveLength(2);
    });

    it("renders ordered lists with correct item count", () => {
      const wrapper = shallowMount(TopFiveStats, {
        props: { entries },
      });
      const lists = wrapper.findAll("ol");
      expect(lists[0].findAll("li")).toHaveLength(2);
      expect(lists[1].findAll("li")).toHaveLength(1);
    });
  });
});
