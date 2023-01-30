import { SelectionModel } from '@angular/cdk/collections'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ChangeUserDialogComponent } from 'src/app/components/change-user-dialog/change-user-dialog.component'
import { CreateUserDialogComponent } from 'src/app/components/create-user-dialog/create-user-dialog.component'
import User from 'src/app/interfaces/user.interface'
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'username',
    'email',
    'roles',
    'edit',
  ]

  users: User[]
  selection = new SelectionModel<User>(true, [])

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    return this.usersService
      .getUsers()
      .subscribe((_users) => (this.users = _users))
  }

  addUser() {
    const userDialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
    })
    userDialogRef.afterClosed().subscribe(() => this.getUsers())
  }

  editUser(element: any) {
    const userDialogRef = this.dialog.open(ChangeUserDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
      data: {
        id: element.id,
        username: element.username,
        email: element.email,
        password: element.password,
        roles: element.roles,
      },
    })
    userDialogRef.afterClosed().subscribe(() => this.getUsers())
  }

  removeUser() {
    for (let user of this.selection.selected) {
      this.usersService.removeUser(user.id).subscribe(() => {
        this.getUsers()
        this.selection.clear()
      })
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected?.length
    const numRows = this.users?.length
    return numSelected === numRows
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }

    this.selection.select(...this.users)
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`
  }
}
