import { ChangeEvent } from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  titleClassName?: string;
  value?: string;
  defaultValue?: string
  onChange?: (value: string) => void;
}


const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  isRequired = false,
  defaultValue,
  titleClassName = "font-avenirHeavy",
  onChange
}) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <label className={titleClassName} >
      {label && (
        <>
          {label}{" "}
          {!isRequired && (<span className="font-avenirBook text-gray text-[12px]">
            (Optional)
          </span>)}
        </>
      )}
      <input
        className="w-full rounded-md border font-avenirBook border-grayMedium p-3"
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default InputField;
