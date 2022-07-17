import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuid } from 'uuid';
import { Artist } from './artist.interface';
import { UpdateArtistDto } from './dto/update-artist.dto';
import db from 'src/db/database';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  create(artist: CreateArtistDto): Artist {
    const newArtist = new Artist({
      ...artist,
      id: uuid(),
    });
    db.artists.push(newArtist);
    return newArtist;
  }

  getAllArtists(): Artist[] {
    return db.artists;
  }

  getArtistById(artistId: string): Artist {
    return db.artists.filter((artist) => artist.id === artistId)[0];
  }

  deleteArtist = (artistId: string) => {
    const indexDb = db.artists.findIndex((artist) => artist.id === artistId);
    db.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
    db.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
    return db.artists.splice(indexDb, 1);
  };

  updateArtist = (artistId: string, data: UpdateArtistDto): Artist => {
    const artistInDb: Artist = db.artists.find(
      (artist) => artist.id === artistId,
    );
    const indexDb = db.artists.findIndex(
      (artistInDb) => artistInDb.id === artistId,
    );

    db.artists[indexDb] = new Artist({
      ...artistInDb,
      name: data.name,
      grammy: data.grammy,
    });
    return db.artists[indexDb];
  };
}
