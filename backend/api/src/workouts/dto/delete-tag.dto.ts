import { PartialType } from '@nestjs/swagger'
import { AddTagDto } from './add-tag.dto'

export class DeleteTagDto extends PartialType(AddTagDto) {}
