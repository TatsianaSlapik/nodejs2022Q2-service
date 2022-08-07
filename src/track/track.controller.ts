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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createdTrack: CreateTrackDto) {
    return await this.trackService.create(createdTrack);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrackById(@Param('id') id: string) {
    if (isValidId(id)) {
      const track = await this.trackService.getTrackById(id);
      if (!track) {
        throw new HttpException(
          'Sorry, but this track has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return track;
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    if (isValidId(id)) {
      const track = await this.trackService.getTrackById(id);
      if (!track) {
        throw new HttpException(
          'Sorry, but this track has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        await this.trackService.deleteTrack(id);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTrack(@Param('id') id: string, @Body() data: UpdateTrackDto) {
    if (isValidId(id)) {
      if (Object.keys(data).length == 0) {
        throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
      }
      const track = await this.trackService.getTrackById(id);
      if (!track) {
        throw new HttpException(
          'Sorry, but this track has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.trackService.updateTrack(id, data);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
