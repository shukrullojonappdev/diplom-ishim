import { SetMetadata } from '@nestjs/common'
import { RoleEnum } from './roles.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...args: RoleEnum[]) => SetMetadata(ROLES_KEY, args)
