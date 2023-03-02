import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ ConfigModule.forRoot(), DevicesModule, AuthModule, UsersModule, PrismaModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
