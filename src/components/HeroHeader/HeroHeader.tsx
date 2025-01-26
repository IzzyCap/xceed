import classNames from "classnames";
import { Artist } from "@/context/Artist";
// import Pencil from "@/assets/img/pencil.svg";
import PlayerButton from "@/components/PlayerButton";
import ArtistInfo from "@/components/ArtistInfo";

interface HeroHeaderProps {
  artist: Artist;
  isFollowed: boolean;
  onClickFollow: () => void;
  onClickEdit: () => void;
}

export default function HeroHeader({
  artist,
  isFollowed,
  onClickEdit,
  onClickFollow,
}: HeroHeaderProps) {
  const followButtonClasses = classNames(
    isFollowed
      ? "rounded-full px-[1.875rem] py-2 border-2 border-white bg-white text-black font-black px-7"
      : "rounded-full px-[1.875rem] py-3 flex gap-3 items-center border-2 text-white font-avenirHeavy"
  );
  return (
    <header
      className="h-[35.75rem] relative bg-cover bg-no-repeat bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${artist.coverUrl}?w=28&blur=auto&fm=auto&q=auto)`,
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-[3.8125rem] lg:mx-[8.375rem] absolute inset-0 lg:top-20 mt-auto">
        <div className="aspect-square h-[15rem] lg:h-[30rem] object-cover my-0 rounded-3xl z-10 overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover object-center"
            src={`${artist.coverUrl}?w=920&fm=auto`}
            alt={`${artist.name} album cover image`}
          />
        </div>
        <div className="flex flex-col lg:flex-grow">
          <div className="flex flex-grow items-center">
            <PlayerButton tracks={artist.tracks} />
            <ArtistInfo artist={artist} />
          </div>
          <div className="flex gap-[1.5rem] mt-5 mx-auto lg:mx-0 lg:my-[2.25rem]">
            <button className={followButtonClasses} onClick={onClickFollow}>
              {isFollowed ? 'Unfollow' : 'Follow'}
            </button>
            <button
              className="rounded-full px-[1.875rem] py-3 px-7 flex gap-3 items-center border-2 text-white font-avenirHeavy "
              onClick={onClickEdit}
            >
              {/* <Pencil /> Edit */}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute h-[4rem] bottom-0 bg-white rounded-tl-[2.25rem] rounded-tr-[2.25rem] w-full"></div>
    </header>
  );
}
