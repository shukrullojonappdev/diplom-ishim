import { Module } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { WorkoutsController } from './workouts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from './entities/workout.entity'
import { Tag } from 'src/tags/entities/tag.entity'
import { User } from 'src/users/entities/user.entity'
import { TagsModule } from 'src/tags/tags.module'

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Tag, User]), TagsModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
