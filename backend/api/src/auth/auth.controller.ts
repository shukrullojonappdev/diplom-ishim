import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'
import { AccessJwtGuard } from './guards/access-jwt.guard'
import { RefreshJwtGuard } from './guards/refresh-jwt.guard'

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['id'])
  }

  @ApiBearerAuth()
  @UseGuards(RefreshJwtGuard)
  @Get('refresh')
  refresh(@Req() req: Request) {
    const id = req.user['id']
    const refTok = req.user['refreshToken']
    return this.authService.refresh(id, refTok)
  }
}
