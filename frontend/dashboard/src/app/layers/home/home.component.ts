import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromIndexStore from 'src/app/store'
import * as fromAuthStore from 'src/app/store/auth'
import { WorkoutsService } from 'src/app/core/services/workouts.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  width: number
  workouts: any
  user: any
  constructor(
    private workoutsService: WorkoutsService,
    private store: Store<fromIndexStore.State>
  ) {}

  ngOnInit(): void {
    this.width = window.innerWidth
    this.getWorkouts('')
    this.store
      .select(fromAuthStore.selectLoggedUser)
      .subscribe((_user) => (this.user = _user))
  }

  getWorkouts(value: any) {
    if (value) {
      this.workoutsService
        .getWorkouts(value)
        .subscribe((_workouts) => (this.workouts = _workouts))
    }
    this.workoutsService
      .getWorkouts(value)
      .subscribe((_workouts) => (this.workouts = _workouts))
  }

  findWorkout(id: number) {
    if (
      this.user.workouts &&
      this.user.workouts.find((e: any) => e.id === id)
    ) {
      return true
    }
    return false
  }

  addWorkout(id: number) {
    this.store.dispatch(
      fromAuthStore.AddWorkout({
        payload: { userId: this.user.id, workoutId: id },
      })
    )
  }

  deleteWorkout(id: number) {
    this.store.dispatch(
      fromAuthStore.DeleteWorkout({
        payload: { userId: this.user.id, workoutId: id },
      })
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth
  }
}
