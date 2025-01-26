import SpotifyLogo from "@/assets/img/spotify.svg";
import WebLogo from "@/assets/img/web.svg";
import SoundCloudLogo from "@/assets/img/soundcloud.svg";
import { Artist, MusicGenre } from "@/context/Artist";
import { Link } from "react-router-dom";

export default function ArtistInfo({ artist }: { artist: Artist }) {
  return (
    <div className="flex flex-grow place-content-between gap-2" data-testid="artist-info">
      <div className="flex flex-col lg:justify-center ml-[1.9375rem]">
        <p className="text-[13px] font-black tracking-[0.0813rem] text-white uppercase">
          Artist{" "}
          <span className="text-paleCyan ml-3">
            {artist?.musicGenres.slice(0,3).map((genre: MusicGenre, index: number) => (
              <span key={`genre-${genre.name}-${index}`}>
                <span>{genre.name.toUpperCase()}</span>
                {index < artist.musicGenres.length - 1 && (
                  <span className="align-super"> . </span>
                )}
              </span>
            ))}
          </span>
        </p>
        <h1 className="text-[32px] leading-[1.13] text-grayDark text-white font-black">
          {artist?.name}
        </h1>
      </div>
      <div className="flex flex-col lg:place-content-around">
        {artist.spotify && <Link to={{ pathname: artist.spotify }} target="_blank"><SpotifyLogo /></Link>}
        {artist.website &&  <Link to={{ pathname: artist.spotify }} target="_blank"><WebLogo /></Link>}
        {artist.soundcloud &&  <Link to={{ pathname: artist.spotify }} target="_blank"><SoundCloudLogo /></Link>}
      </div>
    </div>
  );
}
