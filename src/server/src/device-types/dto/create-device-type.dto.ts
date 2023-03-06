import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDeviceTypeDto {
  /**
   * Name of the type
   */
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  name: string;
}
