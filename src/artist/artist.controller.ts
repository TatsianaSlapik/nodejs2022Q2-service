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
import { Artist } from './artist.interface';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createdArtist: CreateArtistDto): Artist {
    return this.artistService.create(createdArtist);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getArtistById(@Param('id') id: string): Artist {
    if (isValidId(id)) {
      const artist = this.artistService.getArtistById(id);
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
  delete(@Param('id') id: string): void {
    if (isValidId(id)) {
      const artist = this.artistService.getArtistById(id);
      if (!artist) {
        throw new HttpException(
          'Sorry, but this artist has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.artistService.deleteArtist(id);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateArtist(@Param('id') id: string, @Body() data: UpdateArtistDto): Artist {
    if (isValidId(id)) {
      if (Object.keys(data).length == 0) {
        throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
      }
      const artist = this.artistService.getArtistById(id);
      if (!artist) {
        throw new HttpException(
          'Sorry, but this artist has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return this.artistService.updateArtist(id, data);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
