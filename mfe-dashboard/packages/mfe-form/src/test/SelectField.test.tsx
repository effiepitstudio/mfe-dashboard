import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SelectField } from "../components/SelectField";

const options = [
  { value: "GR", label: "Greece" },
  { value: "CY", label: "Cyprus" },
  { value: "US", label: "United States" },
];

describe("SelectField", () => {
  const defaultProps = {
    label: "Country",
    value: "",
    onChange: vi.fn(),
    error: null,
    options,
  };

  describe("snapshots", () => {
    it("matches snapshot with default props", () => {
      const { container } = render(<SelectField {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with error", () => {
      const { container } = render(
        <SelectField {...defaultProps} error="Please select a country" />,
      );
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with placeholder", () => {
      const { container } = render(
        <SelectField {...defaultProps} placeholder="Select a country" />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("accessibility", () => {
    it("sets aria-invalid when error exists", () => {
      render(<SelectField {...defaultProps} error="Required" />);
      expect(screen.getByLabelText("Country")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("links error to select via aria-describedby", () => {
      render(<SelectField {...defaultProps} error="Required" />);
      const select = screen.getByLabelText("Country");
      const errorId = select.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent("Required");
    });
  });

  describe("interaction", () => {
    it("calls onChange with selected value", () => {
      const onChange = vi.fn();
      render(<SelectField {...defaultProps} onChange={onChange} />);
      fireEvent.change(screen.getByLabelText("Country"), {
        target: { value: "GR" },
      });
      expect(onChange).toHaveBeenCalledWith("GR");
    });
  });
});
