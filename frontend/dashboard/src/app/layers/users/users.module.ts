import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UsersRoutingModule } from './users-routing.module'
import { UsersComponent } from './users.component'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { UsersService } from 'src/app/core/services/users.service'
import { CreateUserDialogComponent } from 'src/app/components/create-user-dialog/create-user-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChangeUserDialogComponent } from 'src/app/components/change-user-dialog/change-user-dialog.component'

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserDialogComponent,
    ChangeUserDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
