import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Socket } from 'socket.io';

/**
 * WebSocketAuthService
 * This service handles saving users and devices in cache
 * It links the socket connection to an id in the database
 * If some connection id is not linked to any id, then it
 * is considered as invalid
 */
@Injectable()
export class WebSocketAuthService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async addUserConection(socket: Socket, userSub: string) {
    await this.cache.set(socket.id, userSub);
  }

  async findConnection(socket: Socket) {
    const sub = await this.cache.get<string>(socket.id);
    if (!sub)
      throw new UnauthorizedException('Connection has not been authorized');
    return sub;
  }

  async addDeviceConection(socket: Socket, deviceSub: string) {
    await this.cache.set(socket.id, deviceSub);
  }

  async removeConnection(socket: Socket) {
    await this.cache.del(socket.id);
  }
}
