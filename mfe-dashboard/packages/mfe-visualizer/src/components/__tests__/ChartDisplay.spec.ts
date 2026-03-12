import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ChartDisplay from "../ChartDisplay.vue";
import type { FormEntry } from "@shared/src/types";

vi.mock("vue-chartjs", () => ({
  Bar: { name: "Bar", template: "<canvas />" },
  Pie: { name: "Pie", template: "<canvas />" },
}));

vi.mock("chart.js", () => ({
  Chart: { register: vi.fn() },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  ArcElement: {},
  Title: {},
  Tooltip: {},
  Legend: {},
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
  {
    id: "2",
    timestamp: "2024-01-02T10:00:00Z",
    name: "Sevi",
    country: "CY",
    profession: "Designer",
    height: 168,
    favoriteColor: "green",
    favoriteMovie: "La la land",
  },
];

describe("ChartDisplay", () => {
  describe("rendering", () => {
    it("matches snapshot for bar chart", () => {
      const wrapper = shallowMount(ChartDisplay, {
        props: { entries, chartType: "bar" },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("matches snapshot for pie chart", () => {
      const wrapper = shallowMount(ChartDisplay, {
        props: { entries, chartType: "pie" },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("distributions", () => {
    it("renders a section for each form field", () => {
      const wrapper = shallowMount(ChartDisplay, {
        props: { entries, chartType: "bar" },
      });
      const headings = wrapper.findAll("h3");
      expect(headings.length).toBeGreaterThan(0);
    });

    it("renders field headings even with empty entries (no chart data)", () => {
      const wrapper = shallowMount(ChartDisplay, {
        props: { entries: [], chartType: "bar" },
      });
      // distributions are computed for all fields, even with no entries
      expect(wrapper.findAll("h3").length).toBeGreaterThan(0);
    });
  });

  describe("chart component selection", () => {
    it("renders Bar component for bar type", () => {
      const wrapper = shallowMount(ChartDisplay, {
        props: { entries, chartType: "bar" },
      });
      expect(wrapper.findComponent({ name: "Bar" }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: "Pie" }).exists()).toBe(false);
    });

    it("renders Pie component for pie type", () => {
      const wrapper = shallowMount(ChartDisplay, {
        props: { entries, chartType: "pie" },
      });
      expect(wrapper.findComponent({ name: "Pie" }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: "Bar" }).exists()).toBe(false);
    });
  });
});
