import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WorkoutsRoutingModule } from './workouts-routing.module'
import { WorkoutsComponent } from './workouts.component'
import { CreateWorkoutDialogComponent } from 'src/app/components/create-workout-dialog/create-workout-dialog.component'
import { ChangeWorkoutDialogComponent } from 'src/app/components/change-workout-dialog/change-workout-dialog.component'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { WorkoutsService } from 'src/app/core/services/workouts.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TagsService } from 'src/app/core/services/tags.service'

@NgModule({
  declarations: [
    WorkoutsComponent,
    CreateWorkoutDialogComponent,
    ChangeWorkoutDialogComponent,
  ],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [WorkoutsComponent],
  providers: [WorkoutsService, TagsService],
})
export class WorkoutsModule {}
