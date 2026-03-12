import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../components/Header";

describe("Header", () => {
  const defaultProps = {
    activeRoute: "form" as const,
    onNavigate: vi.fn(),
  };

  describe("snapshots", () => {
    it("matches snapshot with form active", () => {
      const { container } = render(
        <Header {...defaultProps} activeRoute="form" />,
      );
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with visualizer active", () => {
      const { container } = render(
        <Header {...defaultProps} activeRoute="visualizer" />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("navigation", () => {
    it("calls onNavigate with 'form' when Form clicked", () => {
      const onNavigate = vi.fn();
      render(<Header {...defaultProps} onNavigate={onNavigate} />);
      fireEvent.click(screen.getByText("Form"));
      expect(onNavigate).toHaveBeenCalledWith("form");
    });

    it("calls onNavigate with 'visualizer' when Visualizer clicked", () => {
      const onNavigate = vi.fn();
      render(<Header {...defaultProps} onNavigate={onNavigate} />);
      fireEvent.click(screen.getByText("Visualizer"));
      expect(onNavigate).toHaveBeenCalledWith("visualizer");
    });
  });
});
