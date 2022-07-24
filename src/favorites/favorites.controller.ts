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
import { isValidId } from 'src/until/until';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string) {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
    const result = await this.favoritesService.addTrack(id);

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
  async deleteTrack(@Param('id') id: string) {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
    const result = await this.favoritesService.deleteTrack(id);

    if (result == null) {
      throw new HttpException('Does not exist.', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') id: string) {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }

    const result = await this.favoritesService.addAlbum(id);

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
  async deleteAlbum(@Param('id') id: string) {
    const result = await this.favoritesService.deleteAlbum(id);

    if (result == null) {
      throw new HttpException('Does not exist.', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') id: string) {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }

    const result = await this.favoritesService.addArtist(id);

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
  async deleteArtist(@Param('id') id: string) {
    if (!isValidId(id)) {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
    const result = await this.favoritesService.deleteArtist(id);

    if (result == null) {
      throw new HttpException('Does not exist.', HttpStatus.NO_CONTENT);
    }

    return result;
  }
}
