import React, { ChangeEvent, useState } from "react";
import Pencil from "@/assets/img/pencil.svg";

interface ImageFieldProps {
  artistName?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const ImageField: React.FC<ImageFieldProps> = ({
  artistName,
  onChange,
  defaultValue = "",
}) => {
  const [editing, setEditing] = useState(false);
  const [urlValue, setUrlValue] = useState(defaultValue);
  const [temporalUrlValue, setTemporalUrlValue] = useState(defaultValue);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTemporalUrlValue(value);
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = () => {
    if (onChange) {
      setUrlValue(temporalUrlValue);
      onChange(temporalUrlValue);
    }
    setEditing(false);
  };

  return (
    <section className="mb-12">
      <div className="relative">
        <div className="object-fit rounded-md overflow-hidden rounded-md mb-2 aspect-video">
          <img
            src={urlValue}
            alt={`${artistName} cover photo`}
            className="object-cover rounded-md w-full"
          />
          <div
              className="inset-0 absolute rounded-md"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(26, 29, 31, 0.3) -32%, rgba(36, 42, 55, 0.9) 91%)",
              }}
            ></div>
          <button
            type="button"
            className="absolute rounded-full w-10 h-10 bg-babyBlue -right-1 -bottom-1 flex items-center justify-center cursor-pointer"
            onClick={handleEditClick}
            data-testid="edit"
          >
            <Pencil className="stroke-white fill-white cursor-pointer" />
          </button>
        </div>
      </div>
      {editing && (
        <div className="flex mb-2 gap-3 flex-wrap">
          <div className="grow flex flex-col">
            <label htmlFor="cover-url">Image URL</label>
            <input
              id="cover-url"
              type="text"
              className="rounded-md border font-avenirBook border-grayMedium p-3 outline-none grow"
              value={temporalUrlValue}
              data-testid="cover-url-input"
              onChange={handleUrlChange}
            />
          </div>
          <button
            type="button"
            className="rounded-full px-[1.875rem] py-3 flex gap-3 items-center border-2 flex self-end font-avenirHeavy"
            data-testid="cover-url-save"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      )}
    </section>
  );
};

export default ImageField;
