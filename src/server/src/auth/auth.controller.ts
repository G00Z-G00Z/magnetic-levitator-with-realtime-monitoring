import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalGuard } from './local.guard';
import { LoginDto } from './dto';
import { PublicUser } from '../users/interface';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Request() req: Request & { user: PublicUser },
  ) {
    return this.authService.login(req.user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req: Request & { user: PublicUser },
  ) {
    return req.user!
  }
}
