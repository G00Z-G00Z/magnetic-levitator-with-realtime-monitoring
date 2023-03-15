import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { WebSocketDeviceAuthService } from 'src/web-socket-auth/web-socket-device-auth.service';
import { LoginDeviceDto } from './dto';

@WebSocketGateway(8001, {
  namespace: 'devices',
  cors: true,
})
export class DevicesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private readonly wss: Server;

  constructor(private readonly authWebSocket: WebSocketDeviceAuthService) {}

  async handleConnection(
    @ConnectedSocket() deviceConnection: Socket,
    @MessageBody() payload: LoginDeviceDto,
  ) {
    await this.authWebSocket.findConnection(deviceConnection);
    return 'connected';
  }

  /**
   * Deletes the connection from the cache
   */
  async handleDisconnect(@ConnectedSocket() deviceConnection: Socket) {
    await this.authWebSocket.removeConnection(deviceConnection);
    return 'disconnected';
  }

  @SubscribeMessage('send-data')
  sendData(@ConnectedSocket() deviceConnection: Socket): string {
    // get the data
    // Send it to the device and client
    // and that's it
    return 'Hello world!';
  }
}
