import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtConstants } from './constants';
import { JWTUserPayload } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.usersSecret,
    };
    super(options);
  }

  /**
   * If this process reaches, it is guaranteed that we are receiving a valid token
   */
  async validate(payload: JWTUserPayload) {
    const { sub, name, email } = payload;
    return { sub, name, email };
  }
}
