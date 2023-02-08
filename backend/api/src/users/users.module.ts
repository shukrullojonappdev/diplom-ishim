import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Role } from 'src/roles/entities/role.entity'
import { Workout } from 'src/workouts/entities/workout.entity'
import { RolesModule } from 'src/roles/roles.module'
import { WorkoutsModule } from 'src/workouts/workouts.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Workout]),
    RolesModule,
    WorkoutsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
