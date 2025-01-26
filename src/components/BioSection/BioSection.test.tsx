import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BioSection from "./BioSection";
import { Artist } from "@/context/Artist";

describe("BioSection", () => {
  const artist: Artist = {
    id: "1",
    name: "Test Artist",
    musicGenres: [{ name: "test-genre" }, { name: "test-genre2" }],
    slug: "test-artist",
    description: "test description",
    coverUrl: "test-cover-url",
    recordLabel: "test-record-label",
    tracks: [],
  };
  it("renders", () => {
    render(<BioSection artist={artist} />);
    expect(screen.getByText("Bio")).toBeInTheDocument();
    expect(screen.getByText(artist.description)).toBeInTheDocument();
    expect(screen.getByText(artist.recordLabel)).toBeInTheDocument();
  });
  it("description should open on click button", async () => {
    userEvent.setup();
    render(<BioSection artist={artist} />);
    const description = screen.getByTestId("description");
    expect(description).toHaveClass("line-clamp-4");
    expect(description).toHaveClass("max-h-32");
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(description).not.toHaveClass("line-clamp-4");
    expect(description).toHaveClass("max-h-full");
  });
});
