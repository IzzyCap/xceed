export interface ArtistContextData {
  artist: Artist | undefined;
  isArtistLoading: boolean;
  setArtist: (artist: Artist | undefined) => void;
  setArtistId: (id: string | undefined) => void;
  getArtistRequest: (artistId: string) => void;
}

export interface MusicGenre {
  name: string;
}

export interface Track {
  name: string;
  url: string;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  website?: string;
  spotify?: string;
  soundcloud?: string;
  mixcloud?: string;
  description: string;
  coverUrl: string;
  recordLabel: string;
  musicGenres: MusicGenre[];
  tracks: Track[]
}
