import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'
import { jwtContants } from './constants'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    const tokens = await this.generateTokens(user)

    return tokens
  }

  async registration(registrationDto: RegistrationDto) {
    const user = await this.validateUser(
      registrationDto.email,
      registrationDto.password,
    )
    const tokens = await this.generateTokens(user)

    return tokens
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (user && password === user.password) {
      const { password, ...result } = user
      return result
    }
  }

  private async generateTokens(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtContants.accessSecret,
      expiresIn: '30min',
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtContants.refreshSecret,
      expiresIn: '30day',
    })

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }
}
