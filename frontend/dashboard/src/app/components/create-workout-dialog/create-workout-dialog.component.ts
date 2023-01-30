import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { WorkoutsService } from 'src/app/services/workouts.service'

@Component({
  selector: 'app-create-workout-dialog',
  templateUrl: './create-workout-dialog.component.html',
  styleUrls: ['./create-workout-dialog.component.scss'],
})
export class CreateWorkoutDialogComponent {
  workoutFormGroup = this.formBuilder.group({
    name: [''],
    videoSrc: [''],
  })

  constructor(
    private workoutsServise: WorkoutsService,
    private formBuilder: FormBuilder,
    private workoutDialogRef: MatDialogRef<CreateWorkoutDialogComponent>
  ) {}

  addTag() {
    const newWorkout = this.workoutFormGroup.value
    this.workoutsServise
      .createWorkout(newWorkout)
      .subscribe(() => this.workoutDialogRef.close())
  }

  cancelAdd() {
    this.workoutDialogRef.close()
  }
}
