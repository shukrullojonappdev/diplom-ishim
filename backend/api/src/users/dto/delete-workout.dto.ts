import { PartialType } from '@nestjs/swagger'
import { AddWorkoutDto } from './add-workout'

export class DeleteWorkoutDto extends PartialType(AddWorkoutDto) {}
