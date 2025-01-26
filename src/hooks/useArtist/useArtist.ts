import { Artist } from "@/context/Artist/typings";
import { QueryKeys } from "@/views/Artist/typings";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";

export default function useArtist({httpClient = axios, artist}: {
    httpClient?: AxiosInstance, 
    artist: string | undefined
  }) {
  return useQuery<Artist>({
    queryKey: [QueryKeys.ARTIST, artist],
    queryFn: async () => {
      const { data } = await httpClient.get(
        `https://events.staging.xceed.me/v1/artists/${artist}`
      );
      return data.data;
    },
    onError: (error) => {
      // Handle error and display appropriate message
      console.error(error)
    },
    enabled: !!artist,
    retry: false
  });
}
