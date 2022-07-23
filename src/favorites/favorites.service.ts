import { Injectable } from '@nestjs/common';
import { Favorites } from './favorites.interface';
import db from 'src/db/database';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorites = new Favorites();

  getAllFavorites() {
    return db.favorites;
  }

  addTrack(trackId: string): TrackEntity {
    const trackIndex = db.tracks.findIndex((track) => track.id === trackId);

    if (trackIndex == -1) {
      return null;
    }

    db.favorites.tracks.push(db.tracks[trackIndex]);
    return db.tracks[trackIndex];
  }

  deleteTrack = (trackId: string): Favorites => {
    const trackIndex = db.tracks.findIndex((track) => track.id === trackId);

    if (trackIndex == -1) {
      return null;
    }

    db.favorites.tracks = db.favorites.tracks.filter(
      (track) => track.id !== trackId,
    );

    return db.favorites;
  };

  addAlbum(albumId: string): AlbumEntity {
    const albumIndex = db.albums.findIndex((album) => album.id === albumId);
    if (albumIndex == -1) {
      return null;
    }

    db.favorites.albums.push(db.albums[albumIndex]);
    return db.albums[albumIndex];
  }

  deleteAlbum = (albumId: string): Favorites => {
    const albumIndex = db.albums.findIndex((album) => album.id === albumId);
    if (albumIndex == -1) {
      return null;
    }

    db.favorites.albums = db.favorites.albums.filter(
      (album) => album.id !== albumId,
    );
    return db.favorites;
  };

  addArtist(artistId: string): ArtistEntity {
    const artistIndex = db.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (artistIndex == -1) {
      return null;
    }
    db.favorites.artists.push(db.artists[artistIndex]);
    return db.artists[artistIndex];
  }

  deleteArtist = (artistId: string): Favorites => {
    const artistIndex = db.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (artistIndex == -1) {
      return null;
    }

    db.favorites.artists = db.favorites.artists.filter(
      (artist) => artist.id !== artistId,
    );

    return db.favorites;
  };
}
