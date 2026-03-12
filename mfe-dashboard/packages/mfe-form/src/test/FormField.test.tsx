import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormField } from "../components/FormField";

describe("FormField", () => {
  const defaultProps = {
    label: "Name",
    value: "",
    onChange: vi.fn(),
    error: null,
  };

  describe("snapshots", () => {
    it("matches snapshot with default props", () => {
      const { container } = render(<FormField {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with error", () => {
      const { container } = render(
        <FormField {...defaultProps} error="Name is required" />,
      );
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with placeholder", () => {
      const { container } = render(
        <FormField {...defaultProps} placeholder="Enter name" />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("accessibility", () => {
    it("sets aria-invalid when error exists", () => {
      render(<FormField {...defaultProps} error="Required" />);
      expect(screen.getByLabelText("Name")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("sets aria-invalid to false when no error", () => {
      render(<FormField {...defaultProps} />);
      expect(screen.getByLabelText("Name")).toHaveAttribute(
        "aria-invalid",
        "false",
      );
    });

    it("links error to input via aria-describedby", () => {
      render(<FormField {...defaultProps} error="Required" />);
      const input = screen.getByLabelText("Name");
      const errorId = input.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent("Required");
    });
  });

  describe("interaction", () => {
    it("calls onChange with input value", () => {
      const onChange = vi.fn();
      render(<FormField {...defaultProps} onChange={onChange} />);
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "Effie" },
      });
      expect(onChange).toHaveBeenCalledWith("Effie");
    });
  });

  describe("optional props", () => {
    it("applies maxLength attribute", () => {
      render(<FormField {...defaultProps} maxLength={3} />);
      expect(screen.getByLabelText("Name")).toHaveAttribute("maxLength", "3");
    });

    it("applies inputMode attribute", () => {
      render(<FormField {...defaultProps} inputMode="numeric" />);
      expect(screen.getByLabelText("Name")).toHaveAttribute(
        "inputMode",
        "numeric",
      );
    });
  });
});
