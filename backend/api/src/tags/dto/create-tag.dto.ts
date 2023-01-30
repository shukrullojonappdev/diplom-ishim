import { ApiProperty } from '@nestjs/swagger'

export class CreateTagDto {
  @ApiProperty()
  value: string
}
