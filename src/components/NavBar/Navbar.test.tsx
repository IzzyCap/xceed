import {render, screen} from "@testing-library/react";

import NavBar from "./NavBar";

describe("NavBar", () => {
  it("should render the navbar", () => {
    const {container} = render(<NavBar>Test Children</NavBar>);
    expect(container).toBeDefined();
  });
  it("should render the children", () => {
    render(<NavBar>Test Children</NavBar>);
    expect(screen.getByText("Test Children")).toBeDefined();
  });
})
