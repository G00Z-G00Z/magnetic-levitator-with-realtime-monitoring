import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports: [PrismaModule],
})
export class SeedModule {}
