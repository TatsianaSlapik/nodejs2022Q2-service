import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';

export class Favorites {
  constructor() {
    this.albums = [];
    this.artists = [];
    this.tracks = [];
  }

  artists: ArtistEntity[]; // favorite artists ids
  albums: AlbumEntity[]; // favorite albums ids
  tracks: TrackEntity[]; // favorite tracks ids
}
