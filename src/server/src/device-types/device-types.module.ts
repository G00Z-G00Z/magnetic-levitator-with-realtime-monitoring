import { DeviceTypesController } from './device-types.controller';
import { DeviceTypesService } from './device-types.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService],
  exports: [DeviceTypesService],
})
export class DeviceTypesModule {}
