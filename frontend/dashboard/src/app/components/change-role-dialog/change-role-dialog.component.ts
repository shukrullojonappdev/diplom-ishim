import { Component, Inject } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { RolesService } from 'src/app/core/services/roles.service'

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.scss'],
})
export class ChangeRoleDialogComponent {
  roleFormGroup = this.formBuilder.group({
    value: [this.data.value],
    description: [this.data.description],
  })

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private userDialogRef: MatDialogRef<ChangeRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  updateRole() {
    this.roleFormGroup.patchValue({
      value: this.roleFormGroup.value.value,
      description: this.roleFormGroup.value.description,
    })

    const editedTag = this.roleFormGroup.value

    this.rolesService
      .updateRole(this.data.id, editedTag)
      .subscribe(() => this.userDialogRef.close())
  }

  cancelEdit() {
    this.userDialogRef.close()
  }
}
