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
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createdUser: CreateUserDto) {
    return this.userService.create(createdUser);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string) {
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
  updateUser(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
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
        return this.userService.updateUser(id, data);
      }
    } else {
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);
    }
  }
}
