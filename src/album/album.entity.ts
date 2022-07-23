import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Album {
  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }

  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null; // refers to Artist
}
