import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { RolesService } from 'src/app/core/services/roles.service'

@Component({
  selector: 'app-create-role-dialog',
  templateUrl: './create-role-dialog.component.html',
  styleUrls: ['./create-role-dialog.component.scss'],
})
export class CreateRoleDialogComponent {
  roleFormGroup = this.formBuilder.group({
    value: [''],
    description: [''],
  })

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private roleDialogRef: MatDialogRef<CreateRoleDialogComponent>
  ) {}

  addTag() {
    const newRole = this.roleFormGroup.value
    this.rolesService
      .createRole(newRole)
      .subscribe(() => this.roleDialogRef.close())
  }

  cancelAdd() {
    this.roleDialogRef.close()
  }
}
