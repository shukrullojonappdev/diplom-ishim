import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from 'src/app/modules/material.module'

import { RegistrationComponent } from './registration.component'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as authStore from '../../store/auth'

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(authStore.authFeatureKey, authStore.reducer),
    EffectsModule.forFeature([authStore.AuthEffects]),
  ],
})
export class RegistrationModule {}
