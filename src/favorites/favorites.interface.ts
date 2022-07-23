import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.interface';
import { Track } from 'src/track/track.interface';

export class Favorites {
  constructor() {
    this.albums = [];
    this.artists = [];
    this.tracks = [];
  }

  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
