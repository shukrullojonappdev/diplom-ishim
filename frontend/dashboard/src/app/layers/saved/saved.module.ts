import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SavedRoutingModule } from './saved-routing.module'
import { SavedComponent } from './saved.component'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SafePipe } from 'src/app/core/pipes/safe.pipe'

@NgModule({
  declarations: [SavedComponent, SafePipe],
  imports: [
    CommonModule,
    SavedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class SavedModule {}
