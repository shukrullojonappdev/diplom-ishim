import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WorkoutsRoutingModule } from './workouts-routing.module'
import { WorkoutsComponent } from './workouts.component'
import { CreateWorkoutDialogComponent } from 'src/app/components/create-workout-dialog/create-workout-dialog.component'
import { ChangeWorkoutDialogComponent } from 'src/app/components/change-workout-dialog/change-workout-dialog.component'
import { MaterialModule } from 'src/app/modules/material.module'
import { WorkoutsService } from 'src/app/services/workouts.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { wokroutsReducer } from 'src/app/redux/reducers/workouts.reducer'
import { workoutsKey } from 'src/app/redux/selectors/workouts.selector'
import { TagsService } from 'src/app/services/tags.service'

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
    StoreModule.forFeature(workoutsKey, wokroutsReducer),
  ],
  exports: [WorkoutsComponent],
  providers: [WorkoutsService, TagsService],
})
export class WorkoutsModule {}
