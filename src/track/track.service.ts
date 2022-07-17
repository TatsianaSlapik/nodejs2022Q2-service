import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuid } from 'uuid';
import { Track } from './track.interface';
import { UpdateTrackDto } from './dto/update-track.dto';
import db from 'src/db/database';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  create(track: CreateTrackDto): Track {
    const newTrack = new Track({
      ...track,
      id: uuid(),
    });
    db.tracks.push(newTrack);
    return newTrack;
  }

  getAllTracks(): Track[] {
    return db.tracks;
  }

  getTrackById(trackId: string): Track {
    return db.tracks.filter((track) => track.id === trackId)[0];
  }

  deleteTrack = (trackId: string) => {
    const indexDb = db.tracks.findIndex((user) => user.id === trackId);
    return db.tracks.splice(indexDb, 1);
  };

  updateTrack = (trackId: string, data: UpdateTrackDto): Track => {
    const trackInDb: Track = db.tracks.find((track) => track.id === trackId);
    const indexDb = db.tracks.findIndex(
      (trackInDb) => trackInDb.id === trackId,
    );

    db.tracks[indexDb] = new Track({
      ...trackInDb,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
      name: data.name,
    });
    return db.tracks[indexDb];
  };
}
