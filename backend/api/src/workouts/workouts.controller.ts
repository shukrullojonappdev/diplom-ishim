import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AddTagDto } from './dto/add-tag.dto'
import { DeleteTagDto } from './dto/delete-tag.dto'
import { AccessJwtGuard } from 'src/auth/guards/access-jwt.guard'
import { Roles } from 'src/auth/roles/roles.decorator'
import { RoleEnum } from 'src/auth/roles/roles.enum'
import { RolesGuard } from 'src/auth/roles/roles.guard'
import { query } from 'express'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(createWorkoutDto)
  }

  @Get()
  findAll(@Query() query: any) {
    let tags: Array<{ value: string }> = []
    if (query.tags) {
      query.tags.split(',').map((tag: any) => {
        tags.push({ value: tag })
      })
      return this.workoutsService.findAll(tags)
    }

    return this.workoutsService.findAll('')
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(+id)
  }

  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Post('tag')
  addTag(@Body() addTagDto: AddTagDto) {
    return this.workoutsService.addTag(addTagDto)
  }

  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Delete('tag')
  deleteTag(@Body() deleteTagDto: DeleteTagDto) {
    return this.workoutsService.deleteTag(deleteTagDto)
  }

  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto)
  }

  @Roles(RoleEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id)
  }
}
