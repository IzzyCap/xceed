import { ChangeEvent, useState } from "react";

interface TextAreaProps {
  label: string;
  placeholder: string;
  maxLength: number;
  rows?: number;
  onTextAreaChange?: (value: string) => void;
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  maxLength,
  rows = 5,
  onTextAreaChange,
  defaultValue = ""
}) => {
  const [textAreaValue, setTextAreaValue] = useState(defaultValue);
  const textAreaCount = textAreaValue.length;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setTextAreaValue(value);
    if (onTextAreaChange) {
      onTextAreaChange(value);
    }
  };
  

  return (
    <div>
      {label && <h2 className="font-avenirHeavy mb-2">{label}</h2>}
      <div className="flex flex-col">
        <textarea
          className="w-full rounded-md border border-grayMedium p-3 h-[160px] resize-none"
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          onChange={handleChange}
          defaultValue={textAreaValue}
        />
        <p className="text-right text-avenirBook text-gray">
          {`${textAreaCount} / ${maxLength}`}
        </p>
      </div>
    </div>
  );
};

export default TextArea;
