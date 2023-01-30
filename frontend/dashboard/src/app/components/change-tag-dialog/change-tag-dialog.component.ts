import { Component, Inject } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TagsService } from 'src/app/services/tags.service'

@Component({
  selector: 'app-change-tag-dialog',
  templateUrl: './change-tag-dialog.component.html',
  styleUrls: ['./change-tag-dialog.component.scss'],
})
export class ChangeTagDialogComponent {
  tagFormGroup = this.formBuilder.group({
    value: [this.data.value],
  })

  constructor(
    private tagsService: TagsService,
    private formBuilder: FormBuilder,
    private userDialogRef: MatDialogRef<ChangeTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  updateTag() {
    this.tagFormGroup.patchValue({
      value: this.tagFormGroup.value.value,
    })

    const editedTag = this.tagFormGroup.value

    this.tagsService
      .updateTag(this.data.id, editedTag)
      .subscribe(() => this.userDialogRef.close())
  }

  cancelEdit() {
    this.userDialogRef.close()
  }
}
