import { CreateWorkoutDto } from './create-workout.dto'
import { PartialType } from '@nestjs/swagger'

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}
