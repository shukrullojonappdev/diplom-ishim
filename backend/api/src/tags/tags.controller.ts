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
import { TagsService } from './tags.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RoleEnum } from 'src/auth/roles/roles.enum'
import { AccessJwtGuard } from 'src/auth/guards/access-jwt.guard'
import { Roles } from 'src/auth/roles/roles.decorator'
import { RolesGuard } from 'src/auth/roles/roles.guard'

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto)
  }

  @Get()
  findAll() {
    return this.tagsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id)
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto)
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id)
  }
}
