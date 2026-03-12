import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ColumnToggle from "../ColumnToggle.vue";

describe("ColumnToggle", () => {
  describe("rendering", () => {
    it("matches snapshot for single column", () => {
      const wrapper = shallowMount(ColumnToggle, {
        props: { columnCount: 1 },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("matches snapshot for two columns", () => {
      const wrapper = shallowMount(ColumnToggle, {
        props: { columnCount: 2 },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("accessibility", () => {
    it("has radiogroup role", () => {
      const wrapper = shallowMount(ColumnToggle, {
        props: { columnCount: 1 },
      });
      expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true);
    });

    it("marks the active column as checked", () => {
      const wrapper = shallowMount(ColumnToggle, {
        props: { columnCount: 2 },
      });
      const radios = wrapper.findAll('[role="radio"]');
      expect(radios[0].attributes("aria-checked")).toBe("false");
      expect(radios[1].attributes("aria-checked")).toBe("true");
    });
  });

  describe("emits", () => {
    it("emits update:columnCount with 1 when first button clicked", async () => {
      const wrapper = shallowMount(ColumnToggle, {
        props: { columnCount: 2 },
      });
      await wrapper.findAll("button")[0].trigger("click");
      expect(wrapper.emitted("update:columnCount")).toEqual([[1]]);
    });

    it("emits update:columnCount with 2 when second button clicked", async () => {
      const wrapper = shallowMount(ColumnToggle, {
        props: { columnCount: 1 },
      });
      await wrapper.findAll("button")[1].trigger("click");
      expect(wrapper.emitted("update:columnCount")).toEqual([[2]]);
    });
  });
});
