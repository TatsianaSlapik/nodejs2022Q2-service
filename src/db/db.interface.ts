import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import { UserEntity } from 'src/user/user.entity';
import { Favorites } from 'src/favorites/favorites.interface';

export class Db {
  constructor() {
    this.users = [];
    this.albums = [];
    this.artists = [];
    this.tracks = [];
    this.favorites = new Favorites();
  }

  users: UserEntity[];
  artists: ArtistEntity[];
  tracks: TrackEntity[];
  albums: AlbumEntity[];
  favorites: Favorites;
}
