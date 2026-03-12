import { it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LoadingFallback } from "../components/LoadingFallback";

describe("LoadingFallback", () => {
  it("matches snapshot", () => {
    const { container } = render(<LoadingFallback />);
    expect(container).toMatchSnapshot();
  });
});
