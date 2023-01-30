import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RolesRoutingModule } from './roles-routing.module'
import { RolesComponent } from './roles.component'
import { MaterialModule } from 'src/app/modules/material.module'
import { CreateRoleDialogComponent } from 'src/app/components/create-role-dialog/create-role-dialog.component'
import { ChangeRoleDialogComponent } from 'src/app/components/change-role-dialog/change-role-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    RolesComponent,
    CreateRoleDialogComponent,
    ChangeRoleDialogComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RolesComponent],
})
export class RolesModule {}
