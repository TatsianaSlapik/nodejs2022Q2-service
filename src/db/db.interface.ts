import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interface';
import { Track } from 'src/track/track.interface';
import { User } from 'src/user/user.interface';
import { Favorites } from 'src/favorites/favorites.interface';

export class Db {
  constructor() {
    this.users = [];
    this.albums = [];
    this.artists = [];
    this.tracks = [];
    this.favorites = new Favorites();
  }

  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
