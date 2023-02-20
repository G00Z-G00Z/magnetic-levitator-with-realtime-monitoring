import { IsString } from 'class-validator';

/**
 * DTO for MicrocontollerCommandDto
 * It sends a command to the microcontroller
 */
export class MicrocontollerCommandDto {
  @IsString()
  id: string;

  @IsString()
  command: string;
}
