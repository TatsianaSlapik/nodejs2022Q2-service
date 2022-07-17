import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isValidId } from 'src/until/until';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createdUser: CreateUserDto): User {
    return this.userService.create(createdUser);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string): User {
    if (isValidId(id)) {
      const user = this.userService.getUserById(id);
      if (!user) {
        throw new HttpException(
          'Sorry, but this user has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return user;
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    if (isValidId(id)) {
      const user = this.userService.getUserById(id);
      if (!user) {
        throw new HttpException(
          'Sorry, but this user has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.userService.deleteUser(id);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() data: UpdatePasswordDto): User {
    if (isValidId(id)) {
      if (Object.keys(data).length == 0) {
        throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
      }
      const user = this.userService.getUserById(id);
      if (!user) {
        throw new HttpException(
          'Sorry, but this user has not been found.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (data.oldPassword !== user.password) {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else {
          return this.userService.updateUser(id, data);
        }
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
