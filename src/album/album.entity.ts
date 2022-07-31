import { ArtistEntity } from 'src/artist/artist.entity';
import { FavoritesAlbumEntity } from 'src/favorites/favorites.album.entity';
import { TrackEntity } from 'src/track/track.entity';
import {
  Column,
  Entity,
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

  @OneToMany(() => FavoritesAlbumEntity, (favorites) => favorites.album, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  favorites: FavoritesAlbumEntity[];
}
