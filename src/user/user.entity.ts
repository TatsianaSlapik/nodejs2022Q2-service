import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  version: number; // integer number, increments on update

  @Column()
  createdAt: string; // timestamp of creation

  @Column()
  updatedAt: string; // timestamp of last update

  @Column()
  password: string;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
