import { AlbumEntity } from 'src/album/album.entity';
import { FavoritesArtistEntity } from 'src/favorites/favorites.artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }

  @OneToMany(() => TrackEntity, (track) => track.artist, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artist, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  albums: AlbumEntity[];

  @OneToMany(() => FavoritesArtistEntity, (favorites) => favorites.artist, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  favorites: FavoritesArtistEntity[];

  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
