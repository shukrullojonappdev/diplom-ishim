import { Component, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { RolesService } from 'src/app/core/services/roles.service'
import { UsersService } from 'src/app/core/services/users.service'

@Component({
  selector: 'app-change-user-dialog',
  templateUrl: './change-user-dialog.component.html',
  styleUrls: ['./change-user-dialog.component.scss'],
})
export class ChangeUserDialogComponent implements OnInit {
  userFormGroup = this.formBuilder.group({
    username: [this.data.username],
    email: [this.data.email],
    password: [this.data.password],
  })

  roleFormGroup = this.formBuilder.group({
    roles: this.formBuilder.array([]),
  })

  allRoles: any[]

  get roles() {
    return this.roleFormGroup.get('roles') as FormArray
  }

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private userDialogRef: MatDialogRef<ChangeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    this.rolesService.getRoles().subscribe((_roles) => {
      this.allRoles = _roles
      this.createRoleForm()
    })
  }

  changeRole(i: any, value: any) {
    if (value) {
      this.usersService.addRole(this.data.id, this.allRoles[i].id).subscribe()
    } else {
      this.usersService
        .deleteRole(this.data.id, this.allRoles[i].id)
        .subscribe()
    }
  }

  createRoleForm() {
    this.allRoles.forEach((e: any, i: any) => {
      let controlValue = false
      this.data.roles.forEach((m: any) => {
        if (e.value === m.value) {
          controlValue = true
        }
      })
      this.roles.push(this.formBuilder.control(controlValue))
    })
  }

  updateUser() {
    this.userFormGroup.patchValue({
      username: this.userFormGroup.value.username,
      email: this.userFormGroup.value.email,
      password: this.data.password,
    })

    const editedUser = this.userFormGroup.value

    this.usersService
      .updateUser(this.data.id, editedUser)
      .subscribe(() => this.userDialogRef.close())
  }

  cancelEdit() {
    this.userDialogRef.close()
  }
}
