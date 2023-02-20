import { IsDate, IsNumber, IsString } from 'class-validator';

/**
 * DTO for MicroControllerInfo
 * It is used to validate the data received from the microcontroller
 */
export class MicroControllerDataPointDto {
  @IsString()
  id: string;

  @IsDate()
  date: Date;

  @IsNumber()
  error: number;

  @IsNumber()
  current: number;
}
