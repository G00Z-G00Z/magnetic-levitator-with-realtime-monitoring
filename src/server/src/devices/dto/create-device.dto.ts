import { IsString, MaxLength } from 'class-validator';

export class CreateDeviceDto {
  /**
   * Name to identify the device
   */
  @IsString()
  @MaxLength(20)
  name: string;

  /**
   * Type of the device, refer to available types
   */
  @IsString()
  @MaxLength(20)
  type: string;
}
