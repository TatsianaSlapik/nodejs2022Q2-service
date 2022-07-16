import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Album } from './album.interface';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumsService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }
}
