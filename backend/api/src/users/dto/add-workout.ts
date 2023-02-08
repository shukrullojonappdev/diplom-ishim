import { ApiProperty } from '@nestjs/swagger'

export class AddWorkoutDto {
  @ApiProperty()
  userId: number
  @ApiProperty()
  workoutId: number
}
