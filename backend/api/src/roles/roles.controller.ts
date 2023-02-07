import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { RolesService } from './roles.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/roles/roles.decorator'
import { RoleEnum } from 'src/auth/roles/roles.enum'
import { RolesGuard } from 'src/auth/roles/roles.guard'
import { AccessJwtGuard } from 'src/auth/guards/access-jwt.guard'

@Roles(RoleEnum.Admin)
@ApiBearerAuth()
@UseGuards(AccessJwtGuard, RolesGuard)
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id)
  }
}
