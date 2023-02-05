import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { TagsService } from 'src/app/core/services/tags.service'

@Component({
  selector: 'app-create-tag-dialog',
  templateUrl: './create-tag-dialog.component.html',
  styleUrls: ['./create-tag-dialog.component.scss'],
})
export class CreateTagDialogComponent {
  tagFormGroup = this.formBuilder.group({
    value: [''],
  })

  constructor(
    private tagsService: TagsService,
    private formBuilder: FormBuilder,
    private userDialogRef: MatDialogRef<CreateTagDialogComponent>
  ) {}

  addTag() {
    const newTag = this.tagFormGroup.value
    this.tagsService
      .createTag(newTag)
      .subscribe(() => this.userDialogRef.close())
  }

  cancelAdd() {
    this.userDialogRef.close()
  }
}
