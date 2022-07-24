import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuid } from 'uuid';
import { AlbumEntity } from './album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async create(album: CreateAlbumDto) {
    const newAlbum = this.albumsRepository.create({
      ...album,
      id: uuid(),
    });

    return await this.albumsRepository.save(newAlbum);
  }

  async getAllAlbums() {
    const allAlbums = await this.albumsRepository.find();
    return allAlbums;
  }

  async getAlbumById(albumId: string) {
    return await this.albumsRepository.findOne({
      where: { id: albumId },
    });
  }

  async deleteAlbum(albumId: string) {
    return await this.albumsRepository.delete(albumId);
  }

  async updateAlbum(albumId: string, data: UpdateAlbumDto) {
    const albumUpdate = await this.albumsRepository.findOne({
      where: { id: albumId },
    });
    const album = await this.albumsRepository.save({
      ...albumUpdate,
      name: data.name,
      artistId: data.artistId,
      year: data.year,
    });
    return album;
  }
}
