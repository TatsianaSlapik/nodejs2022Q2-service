import { ArtistEntity } from 'src/artist/artist.entity';
import { FavoritesEntity } from 'src/favorites/favorites.entity';
import { TrackEntity } from 'src/track/track.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('album')
export class AlbumEntity {
  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: ArtistEntity; // refers to Artist

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @OneToMany(() => TrackEntity, (track) => track.album, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  tracks: TrackEntity[]; // refers to Track

  @ManyToMany(() => FavoritesEntity, (favorites) => favorites.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinTable()
  favorites: FavoritesEntity[];
}
