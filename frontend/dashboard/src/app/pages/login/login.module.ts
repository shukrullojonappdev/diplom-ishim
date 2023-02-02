import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LoginComponent } from './login.component'
import { MaterialModule } from 'src/app/modules/material.module'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MaterialModule],
})
export class LoginModule {}
