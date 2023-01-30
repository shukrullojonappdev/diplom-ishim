import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RolesService } from 'src/roles/roles.service'
import { Repository } from 'typeorm'
import { AddRoleDto } from './dto/add-role.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteRoleDto } from './dto/delete-role.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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

  async findAll() {
    const users = await this.usersRepository.find({
      relations: {
        roles: true,
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
      relations: { roles: true },
    })

    if (!findedUser) {
      throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
    }

    return findedUser
  }

  async findByEmail(email: string) {
    const findedUser = await this.usersRepository.findOne({
      where: { email: email },
    })

    if (!findedUser) {
      throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
    }

    return findedUser
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

  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    const user = await this.findOne(deleteRoleDto.userId)
    const role = await this.rolesService.findOne(deleteRoleDto.roleId)

    if (user && role) {
      const index = user.roles.indexOf(role)
      user.roles.splice(index, 1)
      await this.usersRepository.save(user)
      return user
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
