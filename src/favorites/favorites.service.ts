import { Injectable } from '@nestjs/common';
import { FavoritesAlbumEntity } from './favorites.album.entity';
import { FavoritesArtistEntity } from './favorites.artist.entity';
import { FavoritesTrackEntity } from './favorites.track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesAlbumEntity)
    private favoritesAlbumRepository: Repository<FavoritesAlbumEntity>,
    @InjectRepository(FavoritesArtistEntity)
    private favoritesArtistRepository: Repository<FavoritesArtistEntity>,
    @InjectRepository(FavoritesTrackEntity)
    private favoritesTrackRepository: Repository<FavoritesTrackEntity>,
  ) {}

  async getAllFavorites() {
    const albums = await this.favoritesAlbumRepository.find({
      relations: {
        album: true,
      },
    });

    const artists = await this.favoritesArtistRepository.find({
      relations: {
        artist: true,
      },
    });

    const tracks = await this.favoritesTrackRepository.find({
      relations: {
        track: true,
      },
    });

    return {
      albums: albums.filter((i) => i.album !== null).map((a) => a.album),
      artists: artists.filter((i) => i.artist !== null).map((a) => a.artist),
      tracks: tracks.filter((i) => i.track !== null).map((t) => t.track),
    };
  }

  async addTrack(trackId: string) {
    return await this.favoritesTrackRepository.save(
      new FavoritesTrackEntity({
        trackId: trackId,
      }),
    );
  }

  async deleteTrack(trackId: string) {
    return await this.favoritesTrackRepository.delete(
      new FavoritesTrackEntity({
        trackId: trackId,
      }),
    );
  }

  async addAlbum(albumId: string) {
    return await this.favoritesAlbumRepository.save(
      new FavoritesAlbumEntity({
        albumId: albumId,
      }),
    );
  }

  async deleteAlbum(albumId: string) {
    return await this.favoritesAlbumRepository.delete(
      new FavoritesAlbumEntity({
        albumId: albumId,
      }),
    );
  }

  async addArtist(artistId: string) {
    return await this.favoritesArtistRepository.save(
      new FavoritesArtistEntity({
        artistId: artistId,
      }),
    );
  }

  async deleteArtist(artistId: string) {
    return await this.favoritesArtistRepository.delete(
      new FavoritesArtistEntity({
        artistId: artistId,
      }),
    );
  }
}
