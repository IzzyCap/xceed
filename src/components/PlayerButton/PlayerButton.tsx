import { Artist } from "@/context/Artist";
import { useRef, useState } from "react";
// import Play from "@/assets/img/play.svg";
// import Pause from "@/assets/img/pause.svg";

interface PlayerButtonProps {
  tracks: Artist["tracks"];
}

const PlayerButton = ({ tracks }: PlayerButtonProps) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!audioRef.current || tracks.length === 0) return
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const playerButtonClasses = "w-[4.5rem] h-[4.5rem] aspect-square rounded-[3.125rem] opacity-80 flex items-center justify-center cursor-pointer"

  return (
    <div
      className={playerButtonClasses}
      style={{
        backgroundImage:
          "linear-gradient(225deg, #32c5ff, #b620e0 49%, #f7b500)",
      }}
      data-testid="play-button"
      onClick={toggleAudio}
    >
      {/* {isAudioPlaying ? <Pause className="w-[25px] h-[25px] fill-white " data-testid="pause-icon"/> : <Play className="w-[25px] h-[25px]" data-testid="play-icon" />} */}
      {tracks.length > 0 && <audio
        ref={audioRef}
        src={tracks[0].url}
        preload="auto"
        title={tracks[0].name}
        onEnded={() => setIsAudioPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>}
    </div>
  );
};

export default PlayerButton;
