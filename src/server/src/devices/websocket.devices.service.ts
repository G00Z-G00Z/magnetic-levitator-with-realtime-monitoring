import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WebSocketDevicesService {
  constructor() {}

  /**
   * Connects the device to the namespaces
   *
   */
  connectDeviceToNamespaces(socket: Socket) {
    socket.join('devices');
    socket.join(socket.id);
  }
}
