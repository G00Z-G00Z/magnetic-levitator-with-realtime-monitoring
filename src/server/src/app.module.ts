import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MicroDataModule } from './micro-data/micro-data.module';
import { Module } from '@nestjs/common';
import { PrismaServiceService } from './prisma-service/prisma-service.service';

@Module({
  imports: [MicroDataModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaServiceService],
})
export class AppModule {}
