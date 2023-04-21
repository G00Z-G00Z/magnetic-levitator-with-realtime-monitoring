import { AppService } from './app.service';
import { Controller, Get, Redirect } from '@nestjs/common';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Redirect('/api', 301)
  getHello() {
  }
}
