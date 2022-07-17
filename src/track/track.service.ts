import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuid } from 'uuid';
import { Track } from './track.interface';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  create(track: CreateTrackDto): Track {
    const newTrack = new Track({
      ...track,
      id: uuid(),
    });
    this.tracks.push(newTrack);
    return newTrack;
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(trackId: string): Track {
    return this.tracks.filter((track) => track.id === trackId)[0];
  }

  deleteTrack = (trackId: string) => {
    const indexDb = this.tracks.findIndex((user) => user.id === trackId);
    return this.tracks.splice(indexDb, 1);
  };

  updateTrack = (trackId: string, data: UpdateTrackDto): Track => {
    const trackInDb: Track = this.tracks.find((track) => track.id === trackId);
    const indexDb = this.tracks.findIndex(
      (trackInDb) => trackInDb.id === trackId,
    );

    this.tracks[indexDb] = new Track({
      ...trackInDb,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
      name: data.name,
    });
    return this.tracks[indexDb];
  };
}
