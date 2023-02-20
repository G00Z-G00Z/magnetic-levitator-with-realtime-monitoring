import { Client } from './client.interface';
import { Microcontroller } from './microcontroller.interface';
import { Socket } from 'socket.io';

export interface SocketClientConnetion {
  client: Client;
  socket: Socket;
}

export interface SocketDeviceConnetion {
  device: Microcontroller;
  socket: Socket;
}
