import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.interface';
import { Track } from 'src/track/track.interface';
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
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
