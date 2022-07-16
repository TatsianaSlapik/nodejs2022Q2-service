import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(user: CreateUserDto) {
    const newUser: User = {
      ...user,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }
}
