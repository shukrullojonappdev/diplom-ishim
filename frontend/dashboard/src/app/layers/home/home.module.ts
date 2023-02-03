import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { SafePipe } from 'src/app/pipes/safe.pipe'
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [HomeComponent, SafePipe],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
