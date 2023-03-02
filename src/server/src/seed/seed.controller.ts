import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@ApiTags('seeder')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  /**
   * Seed database with initial data
   */
  @Get('')
  async seed() {
    await this.seedService.clearDatabase();
    await this.seedService.seedDatabase();
  }
}
