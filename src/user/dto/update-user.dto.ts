import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  newPassword: string; // new password
}
