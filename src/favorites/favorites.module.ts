import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesAlbumEntity } from './favorites.album.entity';
import { FavoritesArtistEntity } from './favorites.artist.entity';
import { FavoritesTrackEntity } from './favorites.track.entity';
import { FavoritesService } from './favorites.service';
import { AlbumService } from 'src/album/album.service';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesAlbumEntity,
      FavoritesArtistEntity,
      FavoritesTrackEntity,
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumService, ArtistService, TrackService],
})
export class FavoritesModule {}
