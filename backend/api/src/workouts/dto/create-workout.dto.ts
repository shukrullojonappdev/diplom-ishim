import { ApiProperty } from '@nestjs/swagger'

export class CreateWorkoutDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  videoUrl: string
}
