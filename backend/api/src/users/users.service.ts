import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { OnModuleInit } from '@nestjs/common/interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { RolesService } from 'src/roles/roles.service'
import { WorkoutsService } from 'src/workouts/workouts.service'
import { Repository } from 'typeorm'
import { AddRoleDto } from './dto/add-role.dto'
import { AddWorkoutDto } from './dto/add-workout'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteRoleDto } from './dto/delete-role.dto'
import { DeleteWorkoutDto } from './dto/delete-workout.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private workoutsService: WorkoutsService,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.rolesService.findByValue('Пользователь')
    const newUser = this.usersRepository.create(createUserDto)
    newUser.roles = [role]

    if (!newUser) {
      throw new HttpException(
        'Ползователь неудачно создан.',
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.usersRepository.save(newUser)
    return newUser
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const admin = await this.rolesService.findByValue('Администратор')
    const user = await this.rolesService.findByValue('Пользователь')
    const newUser = this.usersRepository.create(createUserDto)
    newUser.roles = [user, admin]

    if (!newUser) {
      throw new HttpException(
        'Ползователь неудачно создан.',
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.usersRepository.save(newUser)
    return newUser
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: {
        roles: true,
        workouts: true,
      },
    })

    if (!users) {
      throw new HttpException('Ползователи не найдены.', HttpStatus.BAD_REQUEST)
    }

    return users
  }

  async findOne(id: number) {
    const findedUser = await this.usersRepository.findOne({
      where: { id: id },
      relations: { roles: true, workouts: true },
    })

    if (!findedUser) {
      throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
    }

    return findedUser
  }

  async findOneReturn(email: string) {
    const findedUser = await this.usersRepository.findOne({
      where: { email: email },
      relations: { roles: true, workouts: true },
    })

    if (findedUser) {
      return true
    } else {
      return false
    }
  }

  async findByEmail(email: string) {
    const findedUser = await this.usersRepository.findOne({
      where: { email },
      relations: { roles: true, workouts: true },
    })

    if (findedUser) {
      return findedUser
    } else {
      return null
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.update(id, updateUserDto)

    if (!updatedUser) {
      throw new HttpException(
        'Ползователь не обновлен.',
        HttpStatus.BAD_REQUEST,
      )
    }

    return updatedUser
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.findOne(addRoleDto.userId)
    const role = await this.rolesService.findOne(addRoleDto.roleId)

    if (user && role) {
      user.roles.push(role)
      await this.usersRepository.save(user)
      return user
    }
    throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
  }

  async addWorkout(addWorkoutDto: AddWorkoutDto) {
    const user = await this.findOne(addWorkoutDto.userId)
    const workout = await this.workoutsService.findOne(addWorkoutDto.workoutId)

    if (user && workout) {
      user.workouts.push(workout)
      await this.usersRepository.save(user)
      const { refreshToken, password, ...result } = user
      return result
    }
    throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
  }

  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    const user = await this.findOne(deleteRoleDto.userId)
    const role = await this.rolesService.findOne(deleteRoleDto.roleId)

    if (user && role) {
      const index = user.roles.findIndex((e) => e.id === role.id)
      user.roles.splice(index, 1)
      await this.usersRepository.save(user)
      return user
    }
    throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
  }

  async deleteWorkout(deleteWorkoutDto: DeleteWorkoutDto) {
    const user = await this.findOne(deleteWorkoutDto.userId)
    const workout = await this.workoutsService.findOne(
      deleteWorkoutDto.workoutId,
    )

    if (user && workout) {
      const index = user.workouts.findIndex((e) => e.id === workout.id)
      user.workouts.splice(index, 1)
      await this.usersRepository.save(user)
      const { refreshToken, password, ...result } = user
      return result
    }
    throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
  }

  async remove(id: number) {
    const removedUser = await this.usersRepository.delete(id)

    if (!removedUser) {
      throw new HttpException('Ползователь не удален.', HttpStatus.BAD_REQUEST)
    }

    return removedUser
  }
}
