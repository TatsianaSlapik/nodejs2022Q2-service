import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuid } from 'uuid';
import { Album, AlbumEntity } from './album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import db from 'src/db/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async create(album: CreateAlbumDto) {
    const newAlbum = this.albumsRepository.create(album);

    return await this.albumsRepository.save(newAlbum);
  }

  async getAllAlbums() {
    const allAlbums = await this.albumsRepository.find();
    return allAlbums;
  }

  async getAlbumById(albumId: string) {
    const album = await this.albumsRepository.findOne({
      where: { id: albumId },
    });
    if (album) return album;
    throw new NotFoundException('User was not found');
  }

  deleteAlbum = (albumId: string) => {
    const albumIndexInDb = db.albums.findIndex((album) => album.id === albumId);
    db.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
    const favoriteAlbumIndexDb = db.favorites.albums.findIndex(
      (album) => album.id === albumId,
    );
    db.favorites.albums.splice(favoriteAlbumIndexDb, 1);
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
