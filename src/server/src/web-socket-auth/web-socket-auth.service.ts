import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

/**
 * WebSocketAuthService
 * This service handles saving users and devices in cache
 * It links the socket connection to an id in the database
 * If some connection id is not linked to any id, then it
 * is considered as invalid
 */
@Injectable()
export abstract class WebSocketAuthService<Payload_T> {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    protected readonly authService: AuthService,
  ) {}

  protected abstract getPayload(token: string): Payload_T;

  async addConnection(socket: Socket, token: string) {
    const payload = this.getPayload(token);
    await this.cache.set(socket.id, JSON.stringify(payload));
  }

  async findConnection(socket: Socket): Promise<Payload_T> {
    const payload = await this.cache.get<string>(socket.id);
    if (!payload)
      throw new WsException('Connection has not been authenticated');
    return JSON.parse(payload);
  }

  async removeConnection(socket: Socket) {
    await this.cache.del(socket.id);
  }
}


