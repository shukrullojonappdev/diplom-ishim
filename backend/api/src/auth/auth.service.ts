import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'
import { jwtContants } from './constants'
import { Role } from 'src/roles/entities/role.entity'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    if (user) {
      const { workouts, refreshToken, ...currentUser } = user
      const tokens = await this.generateTokens(currentUser)
      await this.usersService.update(user.id, {
        refreshToken: tokens.refreshToken,
      })

      return tokens
    }

    throw new HttpException(
      'email или пароль неправилно',
      HttpStatus.BAD_REQUEST,
    )
  }

  async registration(registrationDto: RegistrationDto) {
    const userExists = await this.usersService.findByEmail(
      registrationDto.email,
    )

    if (userExists) {
      throw new HttpException(
        'Пользователь с таким email уже существует.',
        HttpStatus.BAD_REQUEST,
      )
    }

    if (userExists === null) {
      const { rePassword, ...newUser } = registrationDto

      const user = await this.usersService.create(newUser)
      const { workouts, refreshToken, ...currentUser } = user
      const tokens = await this.generateTokens(currentUser)
      this.usersService.update(user.id, { refreshToken: tokens.refreshToken })

      return tokens
    }
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (user && password === user.password) {
      const { password, ...result } = user
      return result
    }

    throw new HttpException('asdf', HttpStatus.BAD_REQUEST)
  }

  private async generateTokens(payload: {
    id: number
    username: string
    email: string
    roles: Role[]
  }) {
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
