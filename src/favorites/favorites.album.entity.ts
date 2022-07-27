import { AlbumEntity } from 'src/album/album.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('albumFavs')
export class FavoritesAlbumEntity {
  constructor(partial: Partial<FavoritesAlbumEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.favorites, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  album: AlbumEntity;
}
