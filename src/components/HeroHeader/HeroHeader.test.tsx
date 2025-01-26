//test file
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import HeroHeader from "./HeroHeader";
import { Artist } from "@/context/Artist";

describe("HeroHeader", () => {
  const artist: Artist = {
    id: "1",
    name: "Test Artist",
    musicGenres: [{ name: "test-genre" }, { name: "test-genre2" }],
    slug: "test-artist",
    description: "test description",
    coverUrl: "test-cover-url",
    recordLabel: "test-record-label",
    tracks: [{ name: "patata", url: "patata.com" }],
  };
  const isFollowed = false;
  const onClickFollow = vi.fn();
  const onClickEdit = vi.fn();

  it("should render the hero header", () => {
    const container = render(
      <HeroHeader
        artist={artist}
        isFollowed={isFollowed}
        onClickFollow={onClickFollow}
        onClickEdit={onClickEdit}
      />
    );
    expect(screen.getByText(artist.name)).toBeDefined();
    expect(
      screen.getByText(artist.musicGenres[0].name.toUpperCase())
    ).toBeDefined();
    expect(
      screen.getByText(artist.musicGenres[1].name.toUpperCase())
    ).toBeDefined();

    expect(container).toBeDefined();
  });

  describe("follow button", () => {
    it("should render the follow button", () => {
      render(
        <HeroHeader
          artist={artist}
          isFollowed={isFollowed}
          onClickFollow={onClickFollow}
          onClickEdit={onClickEdit}
        />
      );
      expect(screen.getByText("Follow")).toBeDefined();
    });
    it("when clicked should call onClickFollow", () => {
      render(
        <HeroHeader
          artist={artist}
          isFollowed={isFollowed}
          onClickFollow={onClickFollow}
          onClickEdit={onClickEdit}
        />
      );
      screen.getByText("Follow").click();
      expect(onClickFollow).toHaveBeenCalled();
    });
    it("should change if artist is Followed", () => {
      render(
        <HeroHeader
          artist={artist}
          isFollowed={true}
          onClickFollow={onClickFollow}
          onClickEdit={onClickEdit}
        />
      );
      screen.getByRole("button", { name: "Unfollow" });
    });
  });

  describe("edit button", () => {
    it("should render the edit button", () => {
      render(
        <HeroHeader
          artist={artist}
          isFollowed={isFollowed}
          onClickFollow={onClickFollow}
          onClickEdit={onClickEdit}
        />
      );
      expect(screen.getByText("Edit")).toBeDefined();
    });
    it("when clicked should call onClickEdit", () => {
      render(
        <HeroHeader
          artist={artist}
          isFollowed={isFollowed}
          onClickFollow={onClickFollow}
          onClickEdit={onClickEdit}
        />
      );
      screen.getByText("Edit").click();
      expect(onClickEdit).toHaveBeenCalled();
    });
  });

  it("should render a play button component", () => {
    render(
      <HeroHeader
        artist={artist}
        isFollowed={isFollowed}
        onClickFollow={onClickFollow}
        onClickEdit={onClickEdit}
      />
    );
    expect(screen.getByTestId("play-button")).toBeDefined();
  });

  it("should render a artist info component", () => {
    render(
      <HeroHeader
        artist={artist}
        isFollowed={isFollowed}
        onClickFollow={onClickFollow}
        onClickEdit={onClickEdit}
      />
    );
    expect(screen.getByTestId("artist-info")).toBeDefined();
  });

  it("should render a artist cover image", () => {
    render(
      <HeroHeader
        artist={artist}
        isFollowed={isFollowed}
        onClickFollow={onClickFollow}
        onClickEdit={onClickEdit}
      />
    );
    expect(screen.getByAltText(`${artist.name} album cover image`)).toBeDefined();
  })
});
