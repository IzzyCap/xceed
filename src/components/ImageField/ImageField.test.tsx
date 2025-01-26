import { render, screen, fireEvent } from "@testing-library/react";
import ImageField from "./ImageField";

describe("ImageField", () => {
  test("renders the image with the provided URL", () => {
    const imageUrl = "https://example.com/image.jpg";
    render(<ImageField defaultValue={imageUrl} artistName="name"/>);

    const imageElement = screen.getByAltText(/name cover photo/i);
    expect(imageElement).toHaveAttribute("src", imageUrl);
  });

  test("opens the editing mode when the pencil icon is clicked", () => {
    render(<ImageField />);

    const editButton = screen.getByTestId(/edit/i);
    fireEvent.click(editButton);

    const inputElement = screen.getByTestId(/cover-url-input/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("calls the onChange function with the updated URL when save button is clicked", () => {
    const handleChange = vi.fn();
    render(<ImageField onChange={handleChange} />);

    const editButton = screen.getByTestId(/edit/i);
    fireEvent.click(editButton);

    const inputElement = screen.getByTestId(/cover-url-input/i);
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(inputElement, { target: { value: "https://example.com/new-image.jpg" } });
    fireEvent.click(saveButton);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("https://example.com/new-image.jpg");
  });

  it("should allow editing the default value", () => {
    const onChangeMock = vi.fn();
    const defaultValue = "https://example.com/default.jpg";

    render(
      <ImageField defaultValue={defaultValue} onChange={onChangeMock} />
    );

    const editButton = screen.getByTestId(/edit/i);
    fireEvent.click(editButton);

    // Update the input value
    const input = screen.getByTestId("cover-url-input");
    fireEvent.change(input, { target: { value: "https://example.com/updated.jpg" } });

    // Click on the save button
    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    // Verify the onChange callback was called with the updated value
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("https://example.com/updated.jpg");
  });
});
