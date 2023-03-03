import { CreateUserDto } from './create-user.dto';
import { IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  active?: boolean;
}
