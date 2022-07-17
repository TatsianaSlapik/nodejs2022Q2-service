export class Track {
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }

  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
