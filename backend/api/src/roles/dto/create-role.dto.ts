import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty()
  value: string
  @ApiProperty()
  description: string
}
