import { Client } from './client.interface';
import { Microcontroller } from './microcontroller.interface';
import { Socket } from 'socket.io';

export interface SocketClientConnetion {
  id: string;
  client: Client;
  socket: Socket;
}

export interface SocketDeviceConnetion {
  id: string;
  device: Microcontroller;
  socket: Socket;
}
