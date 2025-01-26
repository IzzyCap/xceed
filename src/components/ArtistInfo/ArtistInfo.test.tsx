import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArtistInfo from "./ArtistInfo";
import { Artist } from "@/context/Artist";

describe("ArtistInfo", () => {
  it("should render the artist info", () => {
    const artist: Artist = {
      id: "1",
      name: "Test Artist",
      musicGenres: [{ name: "test-genre" }, {name: "test-genre2"}],
      slug: "test-artist",
      description: "test description",
      coverUrl: "test-cover-url",
      recordLabel: "test-record-label",
      tracks: [],
    };
    const container = render(<ArtistInfo artist={artist} />);
    expect(screen.getByText(artist.name)).toBeDefined();
    expect(screen.getByText(artist.musicGenres[0].name.toUpperCase())).toBeDefined();
    expect(screen.getByText(artist.musicGenres[1].name.toUpperCase())).toBeDefined();

    expect(container).toBeDefined();
  })
});
