import { render, fireEvent, screen } from "@testing-library/react";
import Dropdown, { Option } from ".";

const options: Option[] = [
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
];

describe("Dropdown", () => {
  it("should render without errors", () => {
    render(<Dropdown options={options} onSelectOptions={() => vi.fn()} />);
  });

  it("should display the label if provided", () => {
    const { getByText } = render(
      <Dropdown label="Music" options={options} onSelectOptions={() => vi.fn()} />
    );
    expect(getByText("Music")).toBeInTheDocument();
  });

  it("should display the optional label if isRequired prop is not provided", () => {
    const { getByText } = render(
      <Dropdown label="Music" options={options} onSelectOptions={() => vi.fn()} />
    );
    expect(getByText("(Optional)")).toBeInTheDocument();
  });

  it("should not display the optional label if isRequired prop is true", () => {
    const { queryByText } = render(
      <Dropdown
        label="Music"
        options={options}
        onSelectOptions={vi.fn()}
        isRequired
      />
    );
    expect(queryByText("(Optional)")).toBeNull();
  });

  it("should toggle the dropdown when clicked", () => {
    const { getByText } = render(
      <Dropdown options={options} onSelectOptions={vi.fn()} />
    );
    const dropdown = getByText("Select up to 3 options");

    fireEvent.click(dropdown);
    expect(screen.getByTestId('dropdown-selector')).toBeInTheDocument();

    fireEvent.click(dropdown);
    expect(screen.queryByTestId('dropdown-selector')).not.toBeInTheDocument();
  });

  it("should select an option when clicked and unselect it when clicked again", () => {
    const onSelectOptions = vi.fn();
    const { getByText } = render(
      <Dropdown options={options} onSelectOptions={onSelectOptions} />
    );
    const dropdown = getByText("Select up to 3 options");
    fireEvent.click(dropdown);
    const option1 = getByText("Option 1");

    fireEvent.click(option1);
    expect(onSelectOptions).toHaveBeenCalledWith([{ name: "Option 1" }]);

    fireEvent.click(option1);
    expect(onSelectOptions).toHaveBeenCalledWith([]);
  });
});
