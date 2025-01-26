export interface Option {
  name: string;
}

export interface DropdownProps {
  label?: string;
  isRequired?: boolean;
  maxOptionsLength?: number;
  options: Option[];
  defaultValue?: Option[];
  onSelectOptions: (selectedOptions: Option[]) => void;
}
