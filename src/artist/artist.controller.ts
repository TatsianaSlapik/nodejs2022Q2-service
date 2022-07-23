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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createdArtist: CreateArtistDto) {
    return await this.artistService.create(createdArtist);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArtistById(@Param('id') id: string) {
    if (isValidId(id)) {
      const artist = await this.artistService.getArtistById(id);
      if (!artist) {
        throw new HttpException(
          'Sorry, but this artist has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return artist;
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    if (isValidId(id)) {
      const artist = await this.artistService.getArtistById(id);
      if (!artist) {
        throw new HttpException(
          'Sorry, but this artist has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        await this.artistService.deleteArtist(id);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateArtist(@Param('id') id: string, @Body() data: UpdateArtistDto) {
    if (isValidId(id)) {
      if (Object.keys(data).length == 0) {
        throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
      }
      const artist = await this.artistService.getArtistById(id);
      if (!artist) {
        throw new HttpException(
          'Sorry, but this artist has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.artistService.updateArtist(id, data);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
