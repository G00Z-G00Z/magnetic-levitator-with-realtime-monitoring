import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(40)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  name: string;
}
