import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { UsersService } from 'src/app/core/services/users.service'

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent {
  userFormGroup = this.formBuilder.group({
    username: [''],
    email: [''],
    password: [''],
  })

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private userDialogRef: MatDialogRef<CreateUserDialogComponent>
  ) {}

  addUser() {
    const newUser = this.userFormGroup.value
    this.usersService
      .createUser(newUser)
      .subscribe(() => this.userDialogRef.close())
  }

  cancelAdd() {
    this.userDialogRef.close()
  }
}
