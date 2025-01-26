import NavBar from "@/components/NavBar";
import XceedLogo from "@/assets/img/xceedLogo.svg";
import Pencil from "@/assets/img/pencil.svg";

import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { musicGendres } from "@/data/genres";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import ImageField from "@/components/ImageField";
import { Artist, ArtistContext, MusicGenre } from "@/context/Artist";
import LoadingSpinner from "@/components/LoadingSpinner";

const EditArtist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isArtistLoading, artist, getArtistRequest, setArtist } =
    useContext(ArtistContext);

  useEffect(() => {
    if (id && !artist) {
      getArtistRequest(id);
    } else if (artist) {
      setSelectedValues(artist.musicGenres);
      setTextAreaValue(artist.description);
      setCoverUrl(artist.coverUrl);
      setInputFields({
        label: artist.recordLabel,
        website: artist.website || "",
        spotify: artist.spotify || "",
        soundcloud: artist.soundcloud || "",
        mixcloud: artist.mixcloud || "",
      });
    } else {
      navigate("/");
    }
  }, [id, getArtistRequest, artist, navigate]);

  const [selectedValues, setSelectedValues] = useState<MusicGenre[]>([]);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [inputFields, setInputFields] = useState({
    label: "",
    website: "",
    spotify: "",
    soundcloud: "",
    mixcloud: "",
  });
  const [coverUrl, setCoverUrl] = useState("");

  const containerClasses = classNames(
    "mx-[1rem]",
    "sm:mx-[7rem]",
    "lg:mx-[14.8125rem]"
  );

  const handleTextAreaValue = (value: string): void => {
    setTextAreaValue(value);
  };

  const handleCoverChange = (url: string): void => {
    setCoverUrl(url);
  };

  const handleSelectOptions = (selectedOptions: MusicGenre[]): void => {
    setSelectedValues(selectedOptions);
  };

  const handleInputFieldChange = (value: string, name: string): void => {
    setInputFields({ ...inputFields, [name]: value });
  };

  const navigateToHome = () => {
    navigate(`/${id}`);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...artist,
      musicGenres: selectedValues,
      description: textAreaValue,
      coverUrl,
      recordLabel: inputFields.label,
      website: inputFields.website,
      spotify: inputFields.spotify,
      soundcloud: inputFields.soundcloud,
      mixcloud: inputFields.mixcloud,
    };
    setArtist(data as Artist);
    navigate(`/${id}`);
  };
  return (
    <>
      <NavBar>
        <XceedLogo className="h-6 cursor-pointer" onClick={navigateToHome} />
      </NavBar>
      {isArtistLoading && (
        <div className="flex h-[calc(100vh-72px)]">
          <LoadingSpinner/>
        </div>
      )}
      <form>
        {artist && (
          <>
            <div className={containerClasses}>
              <header className="mt-20 mb-12">
                <h1 className="font-black text-3xl flex items-center">
                  {artist.name} <Pencil className="h-3 stroke-black" />
                </h1>
                <p className="text-avenirBook text-graySlate font-[14px]">
                  Edit your artist info and artworks here.
                </p>
              </header>
              <section className="relative mb-12">
                <h2 className="font-avenirHeavy mb-2">Photos</h2>
                <ImageField
                  defaultValue={artist.coverUrl}
                  artistName={artist.name}
                  onChange={handleCoverChange}
                />
              </section>
              <section className="mb-7">
                <TextAreaField
                  label="Bio"
                  placeholder="Tell us about yourself"
                  maxLength={5000}
                  onTextAreaChange={handleTextAreaValue}
                  defaultValue={artist.description}
                />
              </section>
              <section className="mb-7 flex flex-col">
                <Dropdown
                  label="Music"
                  options={musicGendres}
                  onSelectOptions={handleSelectOptions}
                  defaultValue={artist.musicGenres.slice(0, 3)}
                />
              </section>
              <section className="relative mb-7 flex flex-col">
                <InputField
                  label="Label"
                  placeholder="Select or add labels"
                  onChange={(value: string) =>
                    handleInputFieldChange(value, "label")
                  }
                  defaultValue={artist.recordLabel}
                />
              </section>
              <section className="relative mb-7 flex flex-col">
                <InputField
                  label="Website"
                  placeholder="Insert URL here"
                  onChange={(value: string) =>
                    handleInputFieldChange(value, "website")
                  }
                  defaultValue={artist.website}
                />
              </section>
              <section className="relative mb-7 flex flex-col">
                <h2 className="font-avenirHeavy mb-2">
                  Social{" "}
                  <span className="font-avenirBook text-gray text-[12px]">
                    (Optional)
                  </span>
                </h2>
                <div className="flex gap-2 flex-col md:flex-row md:gap-7 grow ">
                  <InputField
                    label="Spotify"
                    placeholder="Insert URL here"
                    onChange={(value: string) =>
                      handleInputFieldChange(value, "spotify")
                    }
                    defaultValue={artist.spotify}
                    titleClassName="text-[14px] text-gray"
                  />
                  <InputField
                    label="Mixcloud"
                    placeholder="Insert URL here"
                    onChange={(value: string) =>
                      handleInputFieldChange(value, "mixcloud")
                    }
                    defaultValue={artist.mixcloud}
                    titleClassName="text-[14px] text-gray"
                  />
                  <InputField
                    label="Soundcloud"
                    placeholder="Insert URL here"
                    onChange={(value: string) =>
                      handleInputFieldChange(value, "soundcloud")
                    }
                    defaultValue={artist.soundcloud}
                    titleClassName="text-[14px] text-gray"
                  />
                </div>
              </section>
            </div>

            <footer className="border-t-[1px] border-gray bg-white py-7 sticky bottom-0 w-full md:static">
              <div className={containerClasses}>
                <div className="flex justify-end items-center wrap">
                  <button
                    type="button"
                    className="bg-grayLight text-black font-avenirHeavy text-[14px] px-10 py-3 rounded-lg mr-4 sm:w-auto"
                    onClick={() => navigate(`/${id}`)}
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="bg-primaryBlue text-white font-avenirHeavy text-[14px] px-10 py-3 rounded-lg  sm:w-auto"
                    onClick={handleOnSubmit}
                  >
                    Save artist
                  </button>
                </div>
              </div>
            </footer>
          </>
        )}
      </form>
    </>
  );
};

export default EditArtist;
