import { PartialType } from '@nestjs/swagger'
import { AddRoleDto } from './add-role.dto'

export class DeleteRoleDto extends PartialType(AddRoleDto) {}
