import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import {
    Controller,
    Post,
    Request,
    UseGuards
    } from '@nestjs/common'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    console.log('no esta pasando');
    return req.user;
  }
}
