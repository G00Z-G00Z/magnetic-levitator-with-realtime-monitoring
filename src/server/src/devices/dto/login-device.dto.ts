import { IsJWT, IsString } from 'class-validator';

export class LoginDeviceDto {
  /**
   * Token for login in
   */
  @IsString()
  @IsJWT()
  token: string;
}
