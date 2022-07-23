import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...user,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await this.userRepository.save(newUser);
  }

  async getAllUsers() {
    const users = this.userRepository.find();
    return (await users).map((user) => user);
  }

  async getUserById(userId: string) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async deleteUser(userId: string) {
    return await this.userRepository.delete(userId);
  }

  async updateUser(userId: string, data: UpdatePasswordDto) {
    const userUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (userUpdate) {
      if (data.oldPassword !== userUpdate.password) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        const user = await this.userRepository.save({
          ...userUpdate,
          password: data.newPassword,
          version: userUpdate.version + 1,
          updatedAt: Date.now(),
        });
        return new UserEntity({
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: parseInt(user.createdAt.toString(), 10),
          updatedAt: user.updatedAt,
        });
      }
    }
  }
}
