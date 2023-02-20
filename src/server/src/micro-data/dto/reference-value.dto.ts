import { IsDate, IsNumber, IsString } from 'class-validator';

export class ReferenceValueDto {
  @IsString()
  id: string;

  @IsNumber()
  value: number;
}
