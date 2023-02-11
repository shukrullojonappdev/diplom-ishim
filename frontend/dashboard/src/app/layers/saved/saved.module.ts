import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SavedRoutingModule } from './saved-routing.module'
import { SavedComponent } from './saved.component'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { FormsModule } from '@angular/forms'
import { PipesModule } from 'src/app/core/modules/pipes.module'

@NgModule({
  declarations: [SavedComponent],
  imports: [
    CommonModule,
    SavedRoutingModule,
    FormsModule,
    MaterialModule,
    PipesModule,
  ],
})
export class SavedModule {}
