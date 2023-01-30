import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { ApiTags } from '@nestjs/swagger'
import { AddTagDto } from './dto/add-tag.dto'
import { DeleteTagDto } from './dto/delete-tag.dto'

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(createWorkoutDto)
  }

  @Get()
  findAll() {
    return this.workoutsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(+id)
  }

  @Post('tag')
  addTag(@Body() addTagDto: AddTagDto) {
    return this.workoutsService.addTag(addTagDto)
  }

  @Delete('tag')
  deleteTag(@Body() deleteTagDto: DeleteTagDto) {
    return this.workoutsService.deleteTag(deleteTagDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id)
  }
}
