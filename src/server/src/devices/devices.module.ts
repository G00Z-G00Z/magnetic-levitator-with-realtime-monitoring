import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceTypesModule } from 'src/device-types/device-types.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [DeviceTypesModule, AuthModule],
})
export class DevicesModule {}
