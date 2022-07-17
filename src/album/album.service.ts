import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuid } from 'uuid';
import { Album } from './album.interface';
import { UpdateAlbumDto } from './dto/update-album.dto';
import db from 'src/db/database';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  create(album: CreateAlbumDto): Album {
    const newAlbum = new Album({
      ...album,
      id: uuid(),
    });
    db.albums.push(newAlbum);
    return newAlbum;
  }

  getAllAlbums(): Album[] {
    return db.albums;
  }

  getAlbumById(albumId: string): Album {
    return db.albums.filter((album) => album.id === albumId)[0];
  }

  deleteAlbum = (albumId: string) => {
    const albumIndexInDb = db.albums.findIndex((album) => album.id === albumId);
    db.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
    return db.albums.splice(albumIndexInDb, 1);
  };

  updateAlbum = (albumId: string, data: UpdateAlbumDto): Album => {
    const artistInDb: Album = db.albums.find((album) => album.id === albumId);
    const indexDb = db.albums.findIndex(
      (artistInDb) => artistInDb.id === albumId,
    );

    db.albums[indexDb] = new Album({
      ...artistInDb,
      name: data.name,
      artistId: data.artistId,
      year: data.year,
    });
    return db.albums[indexDb];
  };
}
