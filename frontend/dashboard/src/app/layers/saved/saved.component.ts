import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromIndexStore from 'src/app/store'
import * as fromAuthStore from 'src/app/store/auth'
import { Observable } from 'rxjs'
import { WorkoutsService } from 'src/app/core/services/workouts.service'

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent {
  width: number
  user: any
  workouts: any
  constructor(
    private workoutsService: WorkoutsService,
    private store: Store<fromIndexStore.State>
  ) {}

  ngOnInit(): void {
    this.width = window.innerWidth
    this.store.select(fromAuthStore.selectLoggedUser).subscribe((_user) => {
      this.workouts = _user.workouts
      this.user = _user
    })
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
