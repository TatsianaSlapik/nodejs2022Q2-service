import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { User } from './user.interface';
import { UpdatePasswordDto } from './dto/update-user.dto';
import db from 'src/db/database';

@Injectable()
export class UserService {
  create(user: CreateUserDto): User {
    const newUser = new User({
      ...user,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    db.users.push(newUser);
    return newUser;
  }

  getAllUsers(): User[] {
    return db.users;
  }

  getUserById(userId: string): User {
    return db.users.filter((user) => user.id === userId)[0];
  }

  deleteUser = (userId: string) => {
    const indexDb = db.users.findIndex((user) => user.id === userId);
    return db.users.splice(indexDb, 1);
  };

  updateUser = (userId: string, data: UpdatePasswordDto): User => {
    const userInDb: User = db.users.find((user) => user.id === userId);
    const indexDb = db.users.findIndex((userInDb) => userInDb.id === userId);

    db.users[indexDb] = new User({
      ...userInDb,
      password: data.newPassword,
      version: userInDb.version + 1,
      updatedAt: Date.now(),
    });
    return db.users[indexDb];
  };
}
