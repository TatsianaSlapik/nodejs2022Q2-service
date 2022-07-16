import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  create(album: Album) {
    this.albums.push(album);
  }

  findAll(): Album[] {
    return this.albums;
  }
}
