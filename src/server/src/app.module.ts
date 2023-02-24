import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ ConfigModule.forRoot(), DevicesModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
