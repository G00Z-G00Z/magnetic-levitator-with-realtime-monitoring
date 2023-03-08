import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { JWTUserPayload } from './interfaces';
import { JwtUser } from './jwt-user.decorator';
import { LocalGuard } from './local.guard';
import { LoginDto, RegisterDto } from './dto';
import { Public } from './public.decorator';
import { PublicUser } from '../users/interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Request() req: Request & { user: PublicUser },
  ) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@JwtUser() user: JWTUserPayload) {
    return user;
  }
}
