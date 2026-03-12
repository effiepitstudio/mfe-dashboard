import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubmitButton } from "../components/SubmitButton";

describe("SubmitButton", () => {
  describe("snapshots", () => {
    it("matches snapshot", () => {
      const { container } = render(
        <SubmitButton onClick={vi.fn()} label="Submit Entry" />,
      );
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot when disabled", () => {
      const { container } = render(
        <SubmitButton onClick={vi.fn()} label="Submit Entry" disabled />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("interaction", () => {
    it("calls onClick when clicked", () => {
      const onClick = vi.fn();
      render(<SubmitButton onClick={onClick} label="Submit" />);
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("does not call onClick when disabled", () => {
      const onClick = vi.fn();
      render(<SubmitButton onClick={onClick} label="Submit" disabled />);
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("disabled state", () => {
    it("is not disabled by default", () => {
      render(<SubmitButton onClick={vi.fn()} label="Submit" />);
      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    it("is disabled when prop is true", () => {
      render(<SubmitButton onClick={vi.fn()} label="Submit" disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
