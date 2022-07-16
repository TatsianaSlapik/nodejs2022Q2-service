import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createdUser: CreateUserDto): User {
    return this.userService.create(createdUser);
  }
}
