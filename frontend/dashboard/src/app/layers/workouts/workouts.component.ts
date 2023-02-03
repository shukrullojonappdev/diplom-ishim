import { SelectionModel } from '@angular/cdk/collections'
import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ChangeWorkoutDialogComponent } from 'src/app/components/change-workout-dialog/change-workout-dialog.component'
import { CreateWorkoutDialogComponent } from 'src/app/components/create-workout-dialog/create-workout-dialog.component'
import Workout from 'src/app/interfaces/workout.interface'
import { WorkoutsService } from 'src/app/services/workouts.service'

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'videoSrc', 'edit']

  workouts$: Observable<Workout[]>
  selection = new SelectionModel<any>(true, [])

  constructor(
    private workoutsSerice: WorkoutsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getWorkouts()
  }

  getWorkouts() {}

  addWorkout() {
    const workoutDialogRef = this.dialog.open(CreateWorkoutDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
    })
    workoutDialogRef.afterClosed().subscribe(() => this.getWorkouts())
  }

  editWorkout(element: any) {
    const workoutDialogRef = this.dialog.open(ChangeWorkoutDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
      data: {
        id: element.id,
        name: element.name,
        videoSrc: element.videoSrc,
        tags: element.tags,
      },
    })
    workoutDialogRef.afterClosed().subscribe(() => this.getWorkouts())
  }

  removeWorkout() {
    for (let workout of this.selection.selected) {
      this.workoutsSerice.removeWorkout(workout.id).subscribe(() => {
        this.getWorkouts()
        this.selection.clear()
      })
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected?.length
    let workoutsLength = 0
    this.workouts$.subscribe((workouts) => (workoutsLength = workouts.length))
    const numRows = workoutsLength
    return numSelected === numRows
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }

    this.selection.select(this.workouts$)
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`
  }
}
