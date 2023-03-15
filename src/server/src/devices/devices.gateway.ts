import { UnauthorizedException } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WebSocketAuthService } from 'src/web-socket-auth/web-socket-auth.service';

@WebSocketGateway(80, {
  namespace: 'devices',
})
export class DevicesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly authWebSocket: WebSocketAuthService) {}

  async handleConnection(@ConnectedSocket() deviceConnection: Socket) {
    await this.authWebSocket
      .findConnection(deviceConnection)
      .catch((error) =>
        this.authWebSocket.handleUnathorizedError(error, deviceConnection),
      );
    return 'connected';
  }

  /**
   * Deletes the connection from the cache
   */
  async handleDisconnect(deviceConnection: Socket) {
    await this.authWebSocket.removeConnection(deviceConnection);
    return 'disconnected';
  }

  @SubscribeMessage('message')
  handleMessage(deviceConnection: any, payload: any): string {
    return 'Hello world!';
  }
}
