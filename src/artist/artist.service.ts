import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuid } from 'uuid';
import { ArtistEntity } from './artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import db from 'src/db/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(artist: CreateArtistDto) {
    const newArtist = this.artistsRepository.create({
      ...artist,
      id: uuid(),
    });
    return await this.artistsRepository.save(newArtist);
  }

  async getAllArtists() {
    return await this.artistsRepository.find();
  }

  async getArtistById(artistId: string) {
    return await this.artistsRepository.findOne({ where: { id: artistId } });
  }

  async deleteArtist(artistId: string) {
    /*db.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
    db.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
    const favoriteArtistIndexDb = db.favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    db.favorites.artists.splice(favoriteArtistIndexDb, 1);*/
    return await this.artistsRepository.delete(artistId);
  }

  async updateArtist(artistId: string, data: UpdateArtistDto) {
    const artistUpdate = await this.artistsRepository.findOne({
      where: { id: artistId },
    });

    const artist = await this.artistsRepository.save({
      ...artistUpdate,
      name: data.name,
      grammy: data.grammy,
    });
    return artist;
  }
}
