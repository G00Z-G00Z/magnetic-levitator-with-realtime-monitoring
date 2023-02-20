import { IsDate } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';

/**
 * DTO for MicroControllerInfo
 * It is send by the microcontroller to the server to provide information about the microcontroller
 */
export class MicrocontollerMetadataDto {
  @IsString()
  id: string;

  @IsString()
  referenceValueUnit: string;
}
