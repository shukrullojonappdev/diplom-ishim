import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from './roles.decorator'
import { RoleEnum } from './roles.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return user.roles?.some((role) => requiredRoles.includes(role.value))
  }
}
