interface City {
  coverUrl: string;
  currency: string;
  id: string;
  legacyId: number;
  name: string;
  slug: string;
  timezone: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Venue {
  city: City;
  coordinates: Coordinates;
  coverUrl: string;
  id: string;
  legacyId: number;
  name: string;
  slug: string;
}

export interface EventListItem {
  coverUrl: string;
  endingTime: number;
  id: string;
  legacyId: number;
  name: string;
  slug: string;
  startingTime: number;
  venue: Venue;
}
