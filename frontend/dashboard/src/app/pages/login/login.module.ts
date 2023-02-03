import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from 'src/app/modules/material.module'

import { LoginComponent } from './login.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as authStore from '../../store/auth'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(authStore.authFeatureKey, authStore.reducer),
    EffectsModule.forFeature([authStore.AuthEffects]),
  ],
})
export class LoginModule {}
