import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './devices/devices.module';
import { JwtAuthGuard } from './auth/jwt.guard';
import { CacheModule, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { DeviceTypesModule } from './device-types/device-types.module';
import { WebSocketAuthModule } from './web-socket-auth/web-socket-auth.module';
import redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore as any,
      // Store-specific configuration:
      isGlobal: true,
      host: 'localhost',
      port: 6379,
    }),
    DevicesModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    SeedModule,
    DeviceTypesModule,
    WebSocketAuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
