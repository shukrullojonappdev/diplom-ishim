import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { NavListComponent } from 'src/app/components/nav-list/nav-list.component'
import { UsersModule } from 'src/app/layers/users/users.module'
import { WorkoutsModule } from 'src/app/layers/workouts/workouts.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as authStore from '../../store/auth'
import { AdminGuard } from 'src/app/core/guards/admin.guard'

@NgModule({
  declarations: [MainComponent, NavListComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    UsersModule,
    WorkoutsModule,
    StoreModule.forFeature(authStore.authFeatureKey, authStore.reducer),
    EffectsModule.forFeature([authStore.AuthEffects]),
  ],
  providers: [AdminGuard],
})
export class MainModule {}
