import { Injectable } from '@nestjs/common'
import { PublicUser } from '../users/interface'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<PublicUser | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
