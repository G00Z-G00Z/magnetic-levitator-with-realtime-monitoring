import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ ConfigModule.forRoot(), DevicesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
