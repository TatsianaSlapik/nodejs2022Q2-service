import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto) {
    const { login, password } = user;
    const hashPassword = await bcrypt.hash(password, 'salt');
    const newUser = { login, password: hashPassword };
    return this.userService.create(newUser);
  }

  async login(user: CreateUserDto) {
    const userInDB = await this.userService.getUserByLogin(user.login);

    const { id, login } = userInDB;
    const token = await this.jwtService.signAsync({ id, login });

    return { accessToken: token };
  }

  async getUserByLogin(login: string) {
    return await this.userService.getUserByLogin(login);
  }
  /*async refresh(refreshToken: string) {
   
    return refreshToken;
  }*/
}
