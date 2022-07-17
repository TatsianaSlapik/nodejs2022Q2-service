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
import { Track } from './track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createdTrack: CreateTrackDto): Track {
    return this.trackService.create(createdTrack);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTrackById(@Param('id') id: string): Track {
    if (isValidId(id)) {
      const track = this.trackService.getTrackById(id);
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
  delete(@Param('id') id: string): void {
    if (isValidId(id)) {
      const track = this.trackService.getTrackById(id);
      if (!track) {
        throw new HttpException(
          'Sorry, but this track has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.trackService.deleteTrack(id);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateTrack(@Param('id') id: string, @Body() data: UpdateTrackDto): Track {
    if (isValidId(id)) {
      if (Object.keys(data).length == 0) {
        throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
      }
      const track = this.trackService.getTrackById(id);
      if (!track) {
        throw new HttpException(
          'Sorry, but this track has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return this.trackService.updateTrack(id, data);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
