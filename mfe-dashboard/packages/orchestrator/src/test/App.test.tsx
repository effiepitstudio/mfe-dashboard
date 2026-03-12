import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { App } from "../App";

// Mock the lazy-loaded MFE wrappers
vi.mock("../mfe-wrappers/FormWrapper", () => ({
  default: () => <div data-testid="form-mfe">Form MFE</div>,
}));

vi.mock("../mfe-wrappers/VisualizerWrapper", () => ({
  default: () => <div data-testid="visualizer-mfe">Visualizer MFE</div>,
}));

describe("App", () => {
  // Rendering should be replaced with snapshots, there is no point for testing for text in document
  describe("rendering", () => {
    it("renders the header", () => {
      render(<App />);
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("renders the form MFE by default", async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId("form-mfe")).toBeInTheDocument();
      });
    });
  });

  describe("navigation", () => {
    // the following tests can be better tested by checking the rout instead of the text
    it("switches to visualizer when Visualizer nav is clicked", async () => {
      render(<App />);
      fireEvent.click(screen.getByText("Visualizer"));
      await waitFor(() => {
        expect(screen.getByTestId("visualizer-mfe")).toBeInTheDocument();
      });
    });

    it("switches back to form when Form nav is clicked", async () => {
      render(<App />);
      fireEvent.click(screen.getByText("Visualizer"));
      fireEvent.click(screen.getByText("Form"));
      await waitFor(() => {
        expect(screen.getByTestId("form-mfe")).toBeInTheDocument();
      });
    });
  });
});
