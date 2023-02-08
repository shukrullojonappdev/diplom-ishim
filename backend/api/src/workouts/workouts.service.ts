import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TagsService } from 'src/tags/tags.service'
import { Repository } from 'typeorm'
import { AddTagDto } from './dto/add-tag.dto'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { DeleteTagDto } from './dto/delete-tag.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { Workout } from './entities/workout.entity'

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout) private workoutsRepository: Repository<Workout>,
    private tagsService: TagsService,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    const newWorkout = createWorkoutDto

    if (!newWorkout) {
      throw new HttpException(
        'Ползователь неудачно создан.',
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.workoutsRepository.save(newWorkout)
    return newWorkout
  }

  async findAll() {
    const workouts = await this.workoutsRepository.find({
      relations: {
        tags: true,
      },
    })

    if (!workouts) {
      throw new HttpException('Ползователи не найдены.', HttpStatus.BAD_REQUEST)
    }

    return workouts
  }

  async findOne(id: number) {
    const findedWorkout = await this.workoutsRepository.findOne({
      where: { id: id },
    })

    if (!findedWorkout) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }

    return findedWorkout
  }

  async update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    const updatedWorkout = await this.workoutsRepository.update(
      id,
      updateWorkoutDto,
    )

    if (!updatedWorkout) {
      throw new HttpException(
        'Ползователь не обновлен.',
        HttpStatus.BAD_REQUEST,
      )
    }

    return updatedWorkout
  }

  async addTag(addTagDto: AddTagDto) {
    const workout = await this.findOne(addTagDto.workoutId)
    const tag = await this.tagsService.findOne(addTagDto.tagId)

    if (workout && tag) {
      workout.tags.push(tag)
      await this.workoutsRepository.save(workout)
      return workout
    }
    throw new HttpException('Error', HttpStatus.BAD_REQUEST)
  }

  async deleteTag(deleteTagDto: DeleteTagDto) {
    const workout = await this.findOne(deleteTagDto.workoutId)
    const tag = await this.tagsService.findOne(deleteTagDto.tagId)

    if (workout && tag) {
      const index = workout.tags.indexOf(tag)
      workout.tags.splice(index, 1)
      await this.workoutsRepository.save(workout)
      return workout
    }
    throw new HttpException('Error', HttpStatus.BAD_REQUEST)
  }

  async remove(id: number) {
    const removedWorkout = await this.workoutsRepository.delete(id)

    if (!removedWorkout) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }

    return removedWorkout
  }
}
