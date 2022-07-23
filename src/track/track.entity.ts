import { ArtistEntity } from 'src/artist/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  // @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @Column()
  artistId: string | null; // refers to Artist

  @Column()
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number
}
