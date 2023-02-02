import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AddRoleDto } from './dto/add-role.dto'
import { DeleteRoleDto } from './dto/delete-role.dto'
import { AccessJwtGuard } from 'src/auth/guards/access-jwt.guard'
import { Roles } from 'src/auth/roles/roles.decorator'
import { RoleEnum } from 'src/auth/roles/roles.enum'
import { RolesGuard } from 'src/auth/roles/roles.guard'

@Roles(RoleEnum.Admin)
@ApiBearerAuth()
@UseGuards(AccessJwtGuard, RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto)
  }

  @Delete('role')
  deleteRole(@Body() deleteRoleDto: DeleteRoleDto) {
    return this.usersService.deleteRole(deleteRoleDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
