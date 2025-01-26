import React, { ReactNode, useState } from "react";
import useArtist from "@/hooks/useArtist/useArtist";
import { AxiosInstance } from "axios";
import { ArtistContext } from "./ArtistContext";
import { Artist, ArtistContextData } from ".";

export const ArtistProvider: React.FC<{ httpClient?: AxiosInstance, children: ReactNode }> = ({
  httpClient,
  children,
}) => {
  const [artist, setArtist] = useState<Artist | undefined>(undefined);
  const [artistId, setArtistId] = useState<string | undefined>(undefined);
  
  const { isFetching: isArtistLoading, data } = useArtist({
    httpClient,
    artist: artistId,
  });
  
  const getArtistRequest = async (artistId: string) => {
    if (!artistId) return;
    setArtistId(artistId);
    setArtist(data);
  };

  const value: ArtistContextData = {
    artist,
    isArtistLoading,
    setArtist,
    setArtistId,
    getArtistRequest
  };

  return (
    <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>
  );
};
