import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Tag } from './entities/tag.entity'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private usersRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const newTag = createTagDto

    if (!newTag) {
      throw new HttpException(
        'Ползователь неудачно создан.',
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.usersRepository.save(newTag)
    return newTag
  }

  async findAll() {
    const tags = await this.usersRepository.find()

    if (!tags) {
      throw new HttpException('Ползователи не найдены.', HttpStatus.BAD_REQUEST)
    }

    return tags
  }

  async findOne(id: number) {
    const findedTag = await this.usersRepository.findOneBy({ id })

    if (!findedTag) {
      throw new HttpException('Ползователь не найден.', HttpStatus.BAD_REQUEST)
    }

    return findedTag
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const updatedTag = await this.usersRepository.update(id, updateTagDto)

    if (!updatedTag) {
      throw new HttpException(
        'Ползователь не обновлен.',
        HttpStatus.BAD_REQUEST,
      )
    }

    return updatedTag
  }

  async remove(id: number) {
    const removedTag = await this.usersRepository.delete(id)

    if (!removedTag) {
      throw new HttpException('Ползователь не удален.', HttpStatus.BAD_REQUEST)
    }

    return removedTag
  }
}
