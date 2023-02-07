import { Injectable } from '@nestjs/common'
import { OnModuleInit } from '@nestjs/common/interfaces'
import { AuthService } from './auth/auth.service'
import { RolesService } from './roles/roles.service'
import { UsersService } from './users/users.service'

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private authService: AuthService,
  ) {}

  async onModuleInit() {
    const roles = ['Пользователь', 'Администратор']
    for (let i = 0; i < roles.length; i++) {
      let hasRole = await this.rolesService.findOneReturn(roles[i])
      if (!hasRole) {
        await this.rolesService.create({ value: roles[i] })
      }
    }
    let user = await this.usersService.findOneReturn(
      'shukrullojon.dev@gmail.com',
    )
    if (!user) {
      this.authService.registrationAdmin({
        username: 'admin',
        email: 'shukrullojon.dev@gmail.com',
        password: '@Dmin2000',
      })
    }
  }
}
