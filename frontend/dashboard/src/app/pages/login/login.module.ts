import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from 'src/app/core/modules/material.module'

import { LoginComponent } from './login.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as authStore from '../../store/auth'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(authStore.authFeatureKey, authStore.reducer),
    EffectsModule.forFeature([authStore.AuthEffects]),
  ],
})
export class LoginModule {}
