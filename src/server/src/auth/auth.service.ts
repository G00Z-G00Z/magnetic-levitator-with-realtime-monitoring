import { Injectable } from '@nestjs/common';
import { JWTDevicesPayload, JWTUserPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { PublicUser } from '../users/interface';
import { RegisterDto } from './dto';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<PublicUser | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: PublicUser) {
    const payload: JWTUserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    return await this.login(user);
  }

  /**
   * Generates a token for a device, using a different secret and a different date
   */
  generateAccessTokenForDevice(jwtDevicePayload: JWTDevicesPayload) {
    return this.jwtService.sign(jwtDevicePayload, {
      secret: jwtConstants.devicesSecret,
      expiresIn: '1y',
    });
  }
}
