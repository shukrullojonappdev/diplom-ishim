import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
  @ApiProperty()
  userId: number
  @ApiProperty()
  roleId: number
}
