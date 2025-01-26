import { createContext} from "react";
import { ArtistContextData } from "./typings";


export const ArtistContext = createContext<ArtistContextData>({
  artist: undefined,
  isArtistLoading: false,
  setArtist: () => ({}),
  setArtistId: () => ({}),
  getArtistRequest: () => ({}),
});
