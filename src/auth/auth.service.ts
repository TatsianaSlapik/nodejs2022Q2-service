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
    let hashPassword = '';

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        hashPassword = hash;
      });
    });

    const newUser = { login, password: hashPassword };
    return this.userService.create(newUser);
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'sdasdf' }),
    };
  }

  async getUserByLogin(login: string) {
    return await this.userService.getUserByLogin(login);
  }
  /*async refresh(refreshToken: string) {
   
    return refreshToken;
  }*/

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByLogin(username);
    let hashPassword = '';

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        hashPassword = hash;
      });
    });
    if (user && user.password === hashPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
