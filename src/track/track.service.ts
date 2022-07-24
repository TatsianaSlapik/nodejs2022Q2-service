import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuid } from 'uuid';
import { TrackEntity } from './track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async create(track: CreateTrackDto) {
    const newTrack = this.tracksRepository.create({
      ...track,
      id: uuid(),
    });
    return await this.tracksRepository.save(newTrack);
  }

  async getAllTracks() {
    return await this.tracksRepository.find();
  }

  async getTrackById(trackId: string) {
    return await this.tracksRepository.findOne({ where: { id: trackId } });
  }

  async deleteTrack(trackId: string) {
    return await this.tracksRepository.delete(trackId);
  }

  async updateTrack(trackId: string, data: UpdateTrackDto) {
    const trackUpdate = await this.tracksRepository.findOne({
      where: { id: trackId },
    });
    const track = await this.tracksRepository.save({
      ...trackUpdate,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
      name: data.name,
    });
    return track;
  }
}
