import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
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

  @Post('logout')
  logout(@Body() id: number) {
    return this.authService.logout(id)
  }

  @ApiBearerAuth()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refresh(@Body() { id, refTok }: { id: number; refTok: string }) {
    return this.authService.refresh(id, refTok)
  }
}
