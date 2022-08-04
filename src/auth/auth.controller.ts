import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    return await this.authService.signup(userDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDto: CreateUserDto) {
    const user = await this.authService.getUserByLogin(userDto.login);
    if (!user) {
      throw new HttpException(
        'Sorry, but this user has not been found.',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return await this.authService.login(userDto);
    }
    /*throw new HttpException(
      'Invalid login or password.',
      HttpStatus.BAD_REQUEST,
    );*/
  }
}
