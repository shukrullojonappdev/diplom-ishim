import { ApiProperty } from '@nestjs/swagger'

export class AddTagDto {
  @ApiProperty()
  workoutId: number
  @ApiProperty()
  tagId: number
}
