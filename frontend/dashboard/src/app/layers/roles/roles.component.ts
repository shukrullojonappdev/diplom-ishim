import { SelectionModel } from '@angular/cdk/collections'
import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ChangeRoleDialogComponent } from 'src/app/components/change-role-dialog/change-role-dialog.component'
import { CreateRoleDialogComponent } from 'src/app/components/create-role-dialog/create-role-dialog.component'
import { RolesService } from 'src/app/core/services/roles.service'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  displayedColumns: string[] = ['select', 'id', 'value', 'description', 'edit']

  roles: any[]
  selection = new SelectionModel<any>(true, [])

  constructor(private rolesSerice: RolesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    return this.rolesSerice
      .getRoles()
      .subscribe((_roles) => (this.roles = _roles))
  }

  addRole() {
    const roleDialogRef = this.dialog.open(CreateRoleDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
    })
    roleDialogRef.afterClosed().subscribe(() => this.getRoles())
  }

  editRole(element: any) {
    const roleDialogRef = this.dialog.open(ChangeRoleDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
      data: {
        id: element.id,
        value: element.value,
        description: element.description,
      },
    })
    roleDialogRef.afterClosed().subscribe(() => this.getRoles())
  }

  removeRole() {
    for (let role of this.selection.selected) {
      this.rolesSerice.removeRole(role.id).subscribe(() => {
        this.getRoles()
        this.selection.clear()
      })
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected?.length
    const numRows = this.roles?.length
    return numSelected === numRows
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }

    this.selection.select(...this.roles)
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`
  }
}
