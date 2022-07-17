import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  @Exclude({ toPlainOnly: true })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
