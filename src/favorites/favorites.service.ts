import { Injectable } from '@nestjs/common';
import { FavoritesEntity } from './favorites.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  async getAllFavorites() {
    const r = await this.favoritesRepository.find({
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
    console.log(r);
    return r;
  }

  async addTrack(trackId: string) {
    const fav = new FavoritesEntity({
      tracks: [new TrackEntity({ id: trackId })],
    });

    return await this.favoritesRepository.save(fav);
  }

  async deleteTrack(trackId: string) {
    return await this.favoritesRepository.delete(trackId);
  }

  async addAlbum(albumId: string) {
    const fav = new FavoritesEntity({
      albums: [new AlbumEntity({ id: albumId })],
    });

    return await this.favoritesRepository.save(fav);
  }

  async deleteAlbum(albumId: string) {
    return await this.favoritesRepository.delete(albumId);
  }

  async addArtist(artistId: string) {
    const fav = new FavoritesEntity({
      artists: [new ArtistEntity({ id: artistId })],
    });
    return await this.favoritesRepository.save(fav);
  }

  async deleteArtist(artistId: string) {
    return await this.favoritesRepository.delete(artistId);
  }
}
