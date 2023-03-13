import { Module } from '@nestjs/common';
import { WebSocketAuthService } from './web-socket-auth.service';

@Module({
  providers: [WebSocketAuthService],
  exports: [WebSocketAuthService],
})
export class WebSocketAuthModule {}
