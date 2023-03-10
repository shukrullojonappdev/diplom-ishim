import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'
import * as bcrypt from 'bcrypt'
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
      const { refreshToken, workouts, ...payload } = user
      const tokens = await this.generateTokens(payload)
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10)
      await this.usersService.update(user.id, {
        refreshToken: hashedRefreshToken,
      })
      return {
        tokens: { ...tokens },
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          workouts: user.workouts,
        },
      }
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
      const hashedPassword = await bcrypt.hash(registrationDto.password, 10)
      const user = await this.usersService.create({
        ...registrationDto,
        password: hashedPassword,
      })

      const { password, workouts, refreshToken, ...payload } = user
      const tokens = await this.generateTokens(payload)
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10)
      await this.usersService.update(user.id, {
        refreshToken: hashedRefreshToken,
      })
      return {
        tokens: { ...tokens },
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          workouts: user.workouts,
        },
      }
    }
  }

  async registrationAdmin(registrationDto: RegistrationDto) {
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
      const hashedPassword = await bcrypt.hash(registrationDto.password, 10)
      const user = await this.usersService.createAdmin({
        ...registrationDto,
        password: hashedPassword,
      })

      const { password, workouts, refreshToken, ...payload } = user
      const tokens = await this.generateTokens(payload)
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10)
      await this.usersService.update(user.id, {
        refreshToken: hashedRefreshToken,
      })
      return {
        tokens: { ...tokens },
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          workouts: user.workouts,
        },
      }
    }
  }

  async logout(userId: number) {
    return await this.usersService.update(userId, { refreshToken: null })
  }

  async refresh(id: number, refTok: string) {
    const user = await this.usersService.findOne(id)
    if (!user || !user.refreshToken) {
      throw new HttpException('Нет доступа!', HttpStatus.FORBIDDEN)
    }
    const refreshTokenMatch = await bcrypt.compare(refTok, user.refreshToken)

    if (!refreshTokenMatch) {
      throw new HttpException('Нет доступа!', HttpStatus.FORBIDDEN)
    }
    const { password, workouts, refreshToken, ...payload } = user
    const tokens = await this.generateTokens(payload)
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10)
    await this.usersService.update(user.id, {
      refreshToken: hashedRefreshToken,
    })
    return {
      tokens: { ...tokens },
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        workouts: user.workouts,
      },
    }
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (user && passwordMatch) {
      const { password, ...result } = user
      return result
    }

    throw new HttpException('asdf', HttpStatus.BAD_REQUEST)
  }

  private async generateTokens(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_LIFE_TIME,
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_LIFE_TIME,
    })

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }
}
