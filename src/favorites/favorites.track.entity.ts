import { TrackEntity } from 'src/track/track.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trackFavs')
export class FavoritesTrackEntity {
  constructor(partial: Partial<FavoritesTrackEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: true })
  trackId: string | null;

  @ManyToOne(() => TrackEntity, (track) => track.favorites, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  track: TrackEntity; // favorite tracks ids
}
