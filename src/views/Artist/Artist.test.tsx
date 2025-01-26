import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ArtistContext } from "@/context/Artist";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Artist from "./Artist";

describe("Artist Page", () => {
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
    return {
      ...actual,
      useParams: () => ({ artistId: "tini" }),
      useNavigate: () => vi.fn()
    };
  });
  const queryClient = new QueryClient();
  const artist = {
    id: "1",
    name: "Test Artist",
    musicGenres: [{ name: "test-genre" }, { name: "test-genre2" }],
    slug: "test-artist",
    description: "test description",
    coverUrl: "test-cover-url",
    recordLabel: "test-record-label",
    tracks: [{ name: "test-track", url: "test-track-url"}],
  };

  it("displays loading message when artist is loading", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true
          }}>
          <ArtistContext.Provider
            value={{
              artist: undefined,
              isArtistLoading: true,
              setArtist: () => ({}),
              setArtistId: () => ({}),
              getArtistRequest: () => ({}),
            }}
          >
            <Artist />
          </ArtistContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("displays artist information and handles follow button click", () => {
    render(
      <QueryClientProvider client={queryClient}>
         <BrowserRouter future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true
          }}>
          <ArtistContext.Provider
            value={{
              artist,
              isArtistLoading: false,
              setArtist: () => ({}),
              setArtistId: () => ({}),
              getArtistRequest: () => ({}),
            }}
          >
            <Artist />
          </ArtistContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const artistName = screen.getByText("Test Artist");
    const followButton = screen.getByText("Follow");

    expect(artistName).toBeInTheDocument();
    expect(followButton).toBeInTheDocument();

    fireEvent.click(followButton);
    expect(screen.getByText("Unfollow")).toBeInTheDocument();

    fireEvent.click(followButton);
    expect(screen.getByText("Follow")).toBeInTheDocument();
  });
});
