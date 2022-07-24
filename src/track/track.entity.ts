import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { FavoritesEntity } from 'src/favorites/favorites.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track')
export class TrackEntity {
  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: ArtistEntity | null;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  album: AlbumEntity | null;

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  @ManyToMany(() => FavoritesEntity, (favorites) => favorites.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinTable()
  favorites: FavoritesEntity[];
}
