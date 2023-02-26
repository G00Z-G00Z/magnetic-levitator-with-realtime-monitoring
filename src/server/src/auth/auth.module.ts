import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [UsersModule],
})
export class AuthModule {}
