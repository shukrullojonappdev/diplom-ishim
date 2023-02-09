import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { SafePipe } from 'src/app/core/pipes/safe.pipe'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { FindByTagsComponent } from 'src/app/components/find-by-tags/find-by-tags.component'

@NgModule({
  declarations: [HomeComponent, FindByTagsComponent, SafePipe],
  imports: [CommonModule, HomeRoutingModule, FormsModule, MaterialModule],
})
export class HomeModule {}
