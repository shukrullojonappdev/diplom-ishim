import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RegistrationComponent } from './registration.component'
import { MaterialModule } from 'src/app/modules/material.module'

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, MaterialModule],
})
export class RegistrationModule {}
