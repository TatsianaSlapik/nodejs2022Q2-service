import { TrackEntity } from 'src/track/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }

  //@OneToMany(() => TrackEntity, (track) => track.artistId)
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
