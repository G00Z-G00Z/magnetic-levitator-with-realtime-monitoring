import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceTypesModule } from 'src/device-types/device-types.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [
    DeviceTypesModule,
    JwtModule.register({
      secret: jwtConstants.usersSecret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class DevicesModule {}
