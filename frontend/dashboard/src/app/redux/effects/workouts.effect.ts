import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
import { WorkoutsService } from 'src/app/services/workouts.service'

import * as wokroutsActions from '../actions/workouts.action'

@Injectable()
export class WokroutsEffect {
  constructor(
    private actions$: Actions,
    private workoutsService: WorkoutsService
  ) {}

  getWorkouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wokroutsActions.getWorkouts),
      mergeMap(() =>
        this.workoutsService.getWorkouts().pipe(
          map((_workouts) =>
            wokroutsActions.getWorkoutsSuccess({ workouts: _workouts })
          ),
          catchError(() => of(wokroutsActions.getWorkoutsError))
        )
      )
    )
  )

  createWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wokroutsActions.createWorkout),
      mergeMap((newWorkout) =>
        this.workoutsService.createWorkout(newWorkout).pipe(
          map((_newWorkout) =>
            wokroutsActions.createWorkoutSuccess({ newWorkout: _newWorkout })
          ),
          catchError(() => of(wokroutsActions.createWorkoutError))
        )
      )
    )
  )
}
