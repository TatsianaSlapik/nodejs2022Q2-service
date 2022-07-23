import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  public constructor(init?: Partial<UserEntity>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  version: number; // integer number, increments on update

  @Column({ type: 'bigint' })
  createdAt: number; // timestamp of creation

  @Column({ type: 'bigint' })
  updatedAt: number; // timestamp of last update

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  // toResponse() {
  //   const { id, login, version, createdAt, updatedAt } = this;
  //   return { id, login, version, createdAt, updatedAt };
  // }
}
