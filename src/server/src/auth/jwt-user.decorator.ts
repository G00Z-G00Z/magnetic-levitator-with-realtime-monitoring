import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTUserPayload } from './interfaces';

/**
 * Takes a user from the request object in http
 */
export const JwtUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JWTUserPayload;
  },
);
