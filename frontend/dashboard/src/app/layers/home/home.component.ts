import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import Workout from 'src/app/interfaces/workout.interface'
import { getWorkouts } from 'src/app/redux/actions/workouts.action'
import { AppState } from 'src/app/redux/app.state'
import { selectorWokrouts } from 'src/app/redux/selectors/workouts.selector'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  workouts$: Observable<Workout[]>

  constructor(private store: Store<AppState>) {
    this.workouts$ = store.select(selectorWokrouts)
  }

  ngOnInit(): void {
    this.store.dispatch(getWorkouts())
  }
}
