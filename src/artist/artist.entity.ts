import { AlbumEntity } from 'src/album/album.entity';
import { FavoritesEntity } from 'src/favorites/favorites.entity';
import { TrackEntity } from 'src/track/track.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => FavoritesEntity, (favorites) => favorites.artists, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinTable()
  favorites: FavoritesEntity[];

  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
