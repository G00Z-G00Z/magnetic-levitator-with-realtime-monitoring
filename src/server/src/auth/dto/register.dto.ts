import { IsString, MaxLength, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterUserDto extends LoginDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  name: string;
}
