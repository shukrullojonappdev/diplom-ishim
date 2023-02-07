import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { SafePipe } from 'src/app/core/pipes/safe.pipe'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/core/modules/material.module'

@NgModule({
  declarations: [HomeComponent, SafePipe],
  imports: [CommonModule, HomeRoutingModule, FormsModule, MaterialModule],
})
export class HomeModule {}
