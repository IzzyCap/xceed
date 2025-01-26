import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const fillArtistForm = async ({
  coverUrl = "https://test.com/image.jpg",
  bio = "Artist bio",
  genre = "House",
  label = "Test Label",
  spotify = "Test spotify",
  mixcloud = "Test mixcloud",
  website = "Test website",
  soundcloud = "Test soundcloud"
} = {}) => {
  try {
    // Modify coverUrl
    await userEvent.click(screen.getByTestId("edit"));
    await userEvent.type(screen.getByRole("textbox", { name: /image url/i }), coverUrl);
    await userEvent.click(screen.getByTestId("cover-url-save"));

    // Modify description
    await userEvent.type(screen.getByPlaceholderText(/tell us about yourself/i), bio);

    // Modify genres
    await userEvent.click(screen.getByText(/select up to 3 options/i));
    await userEvent.click(screen.getByText(new RegExp(genre, "i")));

    // Modify label
    await userEvent.type(screen.getByRole("textbox", { name: /label \(optional\)/i }), label);

    // Modify spotify
    await userEvent.type(screen.getByRole("textbox", { name: /spotify \(optional\)/i }), spotify);

    // Modify mixcloud
    await userEvent.type(screen.getByRole("textbox", { name: /mixcloud \(optional\)/i }), mixcloud);

    // Modify website
    await userEvent.type(screen.getByRole("textbox", { name: /website \(optional\)/i }), website);

    // Modify soundcloud
    await userEvent.type(screen.getByRole("textbox", { name: /soundcloud \(optional\)/i }), soundcloud);
  } catch (error) {
    console.error("Error filling artist form:", error);
    throw error;
  }
}
