import { CreateUserDto } from './create-user.dto'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  refreshToken: string
}
