import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = this.rolesRepository.create(createRoleDto)

    if (!newRole) {
      throw new HttpException(
        'Ползователь неудачно создан.',
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.rolesRepository.save(newRole)
    return newRole
  }

  async findAll() {
    const roles = await this.rolesRepository.find()

    if (!roles) {
      throw new HttpException('Ползователи не найдены.', HttpStatus.BAD_REQUEST)
    }

    return roles
  }

  async findOne(id: number) {
    const findedRole = await this.rolesRepository.findOneBy({ id })

    if (!findedRole) {
      throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
    }

    return findedRole
  }

  async findOneReturn(value: string) {
    const findedRole = await this.rolesRepository.findOneBy({ value })

    if (findedRole) {
      return true
    } else {
      return false
    }
  }

  async findByValue(value: string) {
    const findedRole = await this.rolesRepository.findOneBy({ value })

    if (!findedRole) {
      throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
    }

    return findedRole
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.rolesRepository.update(id, updateRoleDto)

    if (!updatedRole) {
      throw new HttpException(
        'Ползователь не обновлен.',
        HttpStatus.BAD_REQUEST,
      )
    }

    return updatedRole
  }

  async remove(id: number) {
    const removedRole = await this.rolesRepository.delete(id)

    if (!removedRole) {
      throw new HttpException('Ползователь не удален.', HttpStatus.BAD_REQUEST)
    }

    return removedRole
  }
}
