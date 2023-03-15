import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { WebSocketDeviceAuthService } from './web-socket-device-auth.service';
import { WebSocketUserAuthService } from './web-socket-user-auth.service';

@Module({
  providers: [WebSocketUserAuthService, WebSocketDeviceAuthService],
  exports: [WebSocketUserAuthService, WebSocketDeviceAuthService],
  imports: [AuthModule],
})
export class WebSocketAuthModule {}
