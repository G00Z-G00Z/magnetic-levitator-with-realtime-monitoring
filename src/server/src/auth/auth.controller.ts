import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto';
import { PublicUser } from '../users/interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Request() req: Request & { user: PublicUser },
  ) {
    console.log('no esta pasando');
    console.log(loginDto);
    return req.user;
  }
}
