import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favs')
export class FavoritesEntity {
  constructor(partial: Partial<FavoritesEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToMany(() => ArtistEntity, (artist) => artist.favorites, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artists: ArtistEntity[]; // favorite artists ids

  @ManyToMany(() => AlbumEntity, (album) => album.favorites, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  albums: AlbumEntity[]; // favorite albums ids

  @ManyToMany(() => TrackEntity, (track) => track.favorites, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  tracks: TrackEntity[]; // favorite tracks ids
}
