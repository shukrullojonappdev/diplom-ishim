import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TagsRoutingModule } from './tags-routing.module'
import { TagsComponent } from './tags.component'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { TagsService } from 'src/app/core/services/tags.service'
import { CreateTagDialogComponent } from 'src/app/components/create-tag-dialog/create-tag-dialog.component'
import { ChangeTagDialogComponent } from 'src/app/components/change-tag-dialog/change-tag-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    TagsComponent,
    CreateTagDialogComponent,
    ChangeTagDialogComponent,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [TagsService],
  exports: [TagsComponent],
})
export class TagsModule {}
