import { useState } from "react";
import classNames from "classnames";
import { Artist } from "@/context/Artist";
import DiscoIcon from "@/assets/img/disco.svg";
import Arrow from "@/assets/img/arrow.svg";

const BioSection = ({ artist }: { artist: Artist }) => {
  const [lineClamp, setLineClamp] = useState<boolean>(true);

  const handleBioClick = () => {
    setLineClamp(!lineClamp);
  };

  const bioSectionClasses = classNames(
    "text-justify",
    "text-grayDark",
    "text-ellipsis",
    "overflow-hidden",
    "transition-all",
    "duration-300",
    { "line-clamp-4": lineClamp },
    { "max-h-32": lineClamp },
    { "max-h-full": !lineClamp }
  );

  const arrowClasses = classNames(
    "fill-babyBlue stroke-babyBlue",
    { "transform rotate-180": !lineClamp },
  )
  const bioSectionContainer = classNames(
    "flex flex-col",
    { "basis-8/12": artist?.recordLabel },
  )
  return (
    <section>
      <h2 className="text-2xl mt-14 font-black">Bio</h2>
      <div className="flex gap-7 flex-col-reverse md:flex-row md:gap-14">
        <div className={bioSectionContainer}>
          <div className={bioSectionClasses} data-testid="description">{artist?.description}</div>
          <button
            className="text-base font-black pt-4"
            onClick={handleBioClick}
          >
            <Arrow className={arrowClasses} />
          </button>
        </div>
        {artist?.recordLabel && (
          <div className="flex flex-col place-content-between self-start bg-white rounded-2xl p-4 gap-5 w-full md:w-auto">
            <div className="flex flex-col">
              <DiscoIcon className="w-5 h-5 mb-2" />
              <p className="font-black text-grayDark">{artist?.recordLabel}</p>
            </div>
            <p className="text-graySlate">Labels</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BioSection;
