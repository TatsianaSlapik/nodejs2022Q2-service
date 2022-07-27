import { ArtistEntity } from 'src/artist/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artistFavs')
export class FavoritesArtistEntity {
  constructor(partial: Partial<FavoritesArtistEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.favorites, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: ArtistEntity; // favorite artists ids
}
