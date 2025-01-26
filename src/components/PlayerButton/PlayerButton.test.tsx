import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlayerButton from "./PlayerButton";

describe("PlayerButton", () => {
  const tracks = [
    {
      name: "test-track",
      url: "test-url",
    },
  ];
  HTMLMediaElement.prototype.play = vi.fn();
  HTMLMediaElement.prototype.pause = vi.fn();

  it("should render the player button", () => {
    render(<PlayerButton tracks={tracks} />);
    expect(screen.getByTestId("play-button")).toBeDefined();
  });

  it("should change state if button is clicked", async () => {
    render(<PlayerButton tracks={tracks} />);
    const button = screen.getByTestId("play-button")

    expect(screen.getByTestId("play-icon")).toBeDefined();
    await userEvent.click(button);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(screen.queryByTestId("play-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("pause-icon")).toBeDefined();
  });

  it("should change state if button is clicked twice", async () => {
    render(<PlayerButton tracks={tracks} />);
    const button = screen.getByTestId("play-button")
    await userEvent.click(button);
    await userEvent.click(button);
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByTestId("play-icon")).toBeDefined();
    expect(screen.queryByTestId("pause-icon")).not.toBeInTheDocument();
  });
});
