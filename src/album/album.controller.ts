import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isValidId } from 'src/until/until';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createdAlbum: CreateAlbumDto) {
    return await this.albumService.create(createdAlbum);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAlbumById(@Param('id') id: string) {
    if (isValidId(id)) {
      const album = await this.albumService.getAlbumById(id);
      if (!album) {
        throw new HttpException(
          'Sorry, but this album has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return album;
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    if (isValidId(id)) {
      const album = await this.albumService.getAlbumById(id);
      if (!album) {
        throw new HttpException(
          'Sorry, but this album has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        await this.albumService.deleteAlbum(id);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(@Param('id') id: string, @Body() data: UpdateAlbumDto) {
    if (isValidId(id)) {
      if (Object.keys(data).length == 0) {
        throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
      }
      const album = await this.albumService.getAlbumById(id);
      if (!album) {
        throw new HttpException(
          'Sorry, but this album has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.albumService.updateAlbum(id, data);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
