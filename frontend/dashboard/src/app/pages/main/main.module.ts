import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { MaterialModule } from 'src/app/modules/material.module'
import { NavListComponent } from 'src/app/components/nav-list/nav-list.component'
import { UsersModule } from 'src/app/layers/users/users.module'
import { TagsModule } from 'src/app/layers/tags/tags.module'
import { RolesModule } from 'src/app/layers/roles/roles.module'
import { WorkoutsModule } from 'src/app/layers/workouts/workouts.module'

@NgModule({
  declarations: [MainComponent, NavListComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    UsersModule,
    TagsModule,
    RolesModule,
    WorkoutsModule,
  ],
})
export class MainModule {}
