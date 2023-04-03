import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceTypesModule } from 'src/device-types/device-types.module';
import { AuthModule } from 'src/auth/auth.module';
import { DevicesGateway } from './devices.gateway';
import { WebSocketAuthModule } from 'src/web-socket-auth/web-socket-auth.module';
import { WebSocketDevicesService } from './websocket.devices.service';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, WebSocketDevicesService, DevicesGateway],
  imports: [DeviceTypesModule, AuthModule, WebSocketAuthModule],
})
export class DevicesModule {}
