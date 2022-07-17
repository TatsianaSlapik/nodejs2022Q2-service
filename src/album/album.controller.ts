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
import { Album } from './album.interface';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createdAlbum: CreateAlbumDto): Album {
    return this.albumService.create(createdAlbum);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getAlbumById(@Param('id') id: string): Album {
    if (isValidId(id)) {
      const album = this.albumService.getAlbumById(id);
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
  delete(@Param('id') id: string): void {
    if (isValidId(id)) {
      const album = this.albumService.getAlbumById(id);
      if (!album) {
        throw new HttpException(
          'Sorry, but this album has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.albumService.deleteAlbum(id);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateAlbum(@Param('id') id: string, @Body() data: UpdateAlbumDto): Album {
    if (isValidId(id)) {
      if (Object.keys(data).length == 0) {
        throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
      }
      const album = this.albumService.getAlbumById(id);
      if (!album) {
        throw new HttpException(
          'Sorry, but this album has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return this.albumService.updateAlbum(id, data);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
