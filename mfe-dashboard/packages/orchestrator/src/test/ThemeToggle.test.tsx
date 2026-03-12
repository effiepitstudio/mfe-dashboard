import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../components/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  describe("snapshots", () => {
    it("matches snapshot in light mode", () => {
      document.documentElement.setAttribute("data-theme", "light");
      const { container } = render(<ThemeToggle />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot in dark mode", () => {
      document.documentElement.setAttribute("data-theme", "dark");
      const { container } = render(<ThemeToggle />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("toggling", () => {
    it("switches to dark theme on click from light mode", () => {
      document.documentElement.setAttribute("data-theme", "light");
      render(<ThemeToggle />);
      fireEvent.click(screen.getByLabelText("Switch to dark theme"));
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("switches to light theme on click from dark mode", () => {
      document.documentElement.setAttribute("data-theme", "dark");
      render(<ThemeToggle />);
      fireEvent.click(screen.getByLabelText("Switch to light theme"));
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });

    it("persists theme to localStorage", () => {
      document.documentElement.setAttribute("data-theme", "light");
      render(<ThemeToggle />);
      fireEvent.click(screen.getByLabelText("Switch to dark theme"));
      expect(localStorage.getItem("dashboard-theme")).toBe("dark");
    });
  });
});
