import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { User } from './user.interface';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(user: CreateUserDto): User {
    const newUser = new User({
      ...user,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User {
    return this.users.filter((user) => user.id === userId)[0];
  }

  deleteUser = (userId: string) => {
    const indexDb = this.users.findIndex((user) => user.id === userId);
    return this.users.splice(indexDb, 1);
  };

  updateUser = (userId: string, data: UpdatePasswordDto): User => {
    const userInDb: User = this.users.find((user) => user.id === userId);
    const indexDb = this.users.findIndex((userInDb) => userInDb.id === userId);

    this.users[indexDb] = new User({
      ...userInDb,
      password: data.newPassword,
      version: userInDb.version + 1,
      updatedAt: Date.now(),
    });
    return this.users[indexDb];
  };
}
