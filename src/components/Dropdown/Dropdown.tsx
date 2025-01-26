import { useEffect, useRef, useState } from "react";
import { DropdownProps, Option } from ".";

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  isRequired = false,
  maxOptionsLength = 3,
  defaultValue = [],
  onSelectOptions,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    if (selectedOptions.includes(option)) {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
      setSelectedOptions(updatedOptions);
    } else {
      if (selectedOptions.length < maxOptionsLength) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    onSelectOptions(selectedOptions);
  }, [selectedOptions, onSelectOptions]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      {label && (
        <label className="font-avenirHeavy">
          {label}{" "}
          {!isRequired && (
            <span className="font-avenirBook text-gray text-[12px]">
              (Optional)
            </span>
          )}{" "}
        </label>
      )}
      <div
        className="rounded-md border font-avenirBook border-grayMedium p-3 cursor-pointer overflow-auto"
        onClick={toggleDropdown}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <span
              key={option.name}
              className="bg-babyBlue text-white px-2 py-1 rounded mr-1"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </span>
          ))
        ) : (
          <span className="text-gray">Select up to 3 options</span>
        )}
      </div>
      {isOpen && (
        <div className="rounded-md border font-avenirBook border-grayMedium" data-testid="dropdown-selector">
          {options.map((option) => (
            <div
              key={option.name}
              className={`p-2 cursor-pointer ${
                selectedOptions.includes(option) ? "bg-babyBlue" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
