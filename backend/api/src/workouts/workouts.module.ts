import { Module } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { WorkoutsController } from './workouts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from './entities/workout.entity'
import { Tag } from 'src/tags/entities/tag.entity'
import { TagsService } from 'src/tags/tags.service'

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Tag])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService, TagsService],
})
export class WorkoutsModule {}
