import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ChartTypeSwitch from "../ChartTypeSwitch.vue";

describe("ChartTypeSwitch", () => {
  describe("rendering", () => {
    it("matches snapshot with bar selected", () => {
      const wrapper = shallowMount(ChartTypeSwitch, {
        props: { chartType: "bar" },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("matches snapshot with pie selected", () => {
      const wrapper = shallowMount(ChartTypeSwitch, {
        props: { chartType: "pie" },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("accessibility", () => {
    it("has radiogroup role", () => {
      const wrapper = shallowMount(ChartTypeSwitch, {
        props: { chartType: "bar" },
      });
      expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true);
    });

    it("marks the active type as checked", () => {
      const wrapper = shallowMount(ChartTypeSwitch, {
        props: { chartType: "pie" },
      });
      const radios = wrapper.findAll('[role="radio"]');
      expect(radios[0].attributes("aria-checked")).toBe("false");
      expect(radios[1].attributes("aria-checked")).toBe("true");
    });
  });

  describe("emits", () => {
    it("emits update:chartType with 'bar' when Bar clicked", async () => {
      const wrapper = shallowMount(ChartTypeSwitch, {
        props: { chartType: "pie" },
      });
      await wrapper.findAll("button")[0].trigger("click");
      expect(wrapper.emitted("update:chartType")).toEqual([["bar"]]);
    });

    it("emits update:chartType with 'pie' when Pie clicked", async () => {
      const wrapper = shallowMount(ChartTypeSwitch, {
        props: { chartType: "bar" },
      });
      await wrapper.findAll("button")[1].trigger("click");
      expect(wrapper.emitted("update:chartType")).toEqual([["pie"]]);
    });
  });
});
