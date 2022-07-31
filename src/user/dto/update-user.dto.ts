import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  oldPassword: string; // previous password

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  newPassword: string; // new password
}
