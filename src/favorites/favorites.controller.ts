import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interface';
import { Track } from 'src/track/track.interface';
import { isValidId } from 'src/until/until';
import { Favorites } from './favorites.interface';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Favorites {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  public addTrack(@Param('id') id: string): Track {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.addTrack(id);

    if (result == null) {
      throw new HttpException(
        'Does not exist.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return result;
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTrack(@Param('id') id: string): Favorites {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.deleteTrack(id);

    if (result == null) {
      throw new HttpException('Does not exist.', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  public addAlbum(@Param('id') id: string): Album {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }

    const result = this.favoritesService.addAlbum(id);

    if (result == null) {
      throw new HttpException(
        'Does not exist.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return result;
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAlbum(@Param('id') id: string): Favorites {
    const result = this.favoritesService.deleteAlbum(id);

    if (result == null) {
      throw new HttpException('Does not exist.', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  public addArtist(@Param('id') id: string): Artist {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }

    const result = this.favoritesService.addArtist(id);

    if (result == null) {
      throw new HttpException(
        'Does not exist.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return result;
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteArtist(@Param('id') id: string): Favorites {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
    const result = this.favoritesService.deleteArtist(id);

    if (result == null) {
      throw new HttpException('Does not exist.', HttpStatus.NO_CONTENT);
    }

    return result;
  }
}
