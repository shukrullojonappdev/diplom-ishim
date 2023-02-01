import { ApiProperty } from '@nestjs/swagger'

export class RegistrationDto {
  @ApiProperty()
  username: string
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
}
