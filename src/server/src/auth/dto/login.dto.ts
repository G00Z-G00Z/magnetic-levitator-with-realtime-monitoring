import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(40)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string;
}
