import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Role } from 'src/roles/entities/role.entity'
import { jwtContants } from '../constants'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtContants.refreshSecret,
      passReqToCallback: true,
    })
  }
  async validate(
    payload: {
      id: number
      username: string
      email: string
      refreshToken: string
      roles: Role[]
    },
    req: Request,
  ) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim()

    return { ...payload, refreshToken }
  }
}
