import {render, screen} from "@testing-library/react";

import ModalDialog from "./ModalDialog";

describe("ModalDialog", () => {
  it("should render the modal dialog", () => {
    const {container} = render(<ModalDialog isOpen={false} onClose={() =>vi.fn()}>Test Children</ModalDialog>);
    expect(container).toBeDefined();
  });
  it("should render the children", () => {
    render(<ModalDialog isOpen={true} onClose={() =>vi.fn()}>Test Children</ModalDialog>);
    expect(screen.getByText("Test Children")).toBeDefined();
  });
  it("should render the close button", () => {
    render(<ModalDialog isOpen={true} onClose={() =>vi.fn()}>Test Children</ModalDialog>);
    expect(screen.getByText("X")).toBeDefined();
  })

  it("should call onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<ModalDialog isOpen={true} onClose={onClose}>Test Children</ModalDialog>);
    screen.getByText("X").click();
    expect(onClose).toHaveBeenCalled();
  })

  it("should not call onClose when modal is clicked", () => {
    const onClose = vi.fn();
    render(<ModalDialog isOpen={true} onClose={onClose}>Test Children</ModalDialog>);
    screen.getByText("Test Children").click();
    expect(onClose).not.toHaveBeenCalled();
  })

  it("should call onClose when clicking outside", () => {
    const onClose = vi.fn();
    render(<ModalDialog isOpen={true} onClose={onClose}>Test Children</ModalDialog>);
    screen.getByTestId("backdrop").click();
    expect(onClose).toHaveBeenCalled();
  })
})
