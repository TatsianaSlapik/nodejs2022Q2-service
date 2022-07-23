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
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    });

    return (await this.userRepository.save(newUser)).toResponse();
  }

  async getAllUsers() {
    const users = this.userRepository.find();
    return (await users).map((user) => user.toResponse());
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) return user.toResponse();
    throw new NotFoundException('User was not found');
  }

  async deleteUser(userId: string) {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('User was not found');
    }
  }

  async updateUser(userId: string, data: UpdatePasswordDto) {
    const userUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (userUpdate) {
      if (data.oldPassword !== userUpdate.password) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        return await this.userRepository.save({
          ...userUpdate,
          password: data.newPassword,
          version: userUpdate.version + 1,
          updatedAt: Date.now().toString(),
        });
      }
    }
    throw new NotFoundException('User was not found');
  }
}
