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
import { DeleteWorkoutDto } from './dto/delete-workout.dto'
import { AddWorkoutDto } from './dto/add-workout'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto)
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Delete('role')
  deleteRole(@Body() deleteRoleDto: DeleteRoleDto) {
    return this.usersService.deleteRole(deleteRoleDto)
  }

  @Post('workout')
  addWorkout(@Body() addWorkoutDto: AddWorkoutDto) {
    return this.usersService.addWorkout(addWorkoutDto)
  }

  @Delete('workout')
  deleteWorkout(@Body() deleteWorkoutDto: DeleteWorkoutDto) {
    return this.usersService.deleteWorkout(deleteWorkoutDto)
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
