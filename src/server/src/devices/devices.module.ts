import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceTypesModule } from 'src/device-types/device-types.module';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [DeviceTypesModule],
})
export class DevicesModule {}
