import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AccessJwtStrategy } from './strategies/access-jwt.strategy'
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
  imports: [UsersModule, JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
