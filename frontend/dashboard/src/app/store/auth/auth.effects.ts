import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap, catchError, of, tap, repeat } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth.service'
import { UsersService } from 'src/app/core/services/users.service'
import * as fromAuthAction from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersSerivece: UsersService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.Login),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.authService.login(payload).pipe(
          tap(() => this.router.navigate(['/', 'home'])),
          map((_data) => fromAuthAction.LoginSuccess({ data: _data })),
          catchError((error) =>
            of(fromAuthAction.LoginFailure({ error: error }))
          )
        )
      )
    )
  )

  registration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.Registration),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.authService.registration(payload).pipe(
          tap(() => this.router.navigate(['/', 'home'])),
          map((_data) => fromAuthAction.RegistrationSuccess({ data: _data })),
          catchError((error) =>
            of(fromAuthAction.RegistrationFailure({ error: error }))
          )
        )
      )
    )
  )

  addWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.AddWorkout),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.usersSerivece.addWorkout(payload.userId, payload.workoutId).pipe(
          map((_data) => fromAuthAction.AddWorkoutSuccess({ data: _data })),
          catchError((error) =>
            of(fromAuthAction.AddWorkoutFailure({ error: error }))
          )
        )
      )
    )
  )

  deleteWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.DeleteWorkout),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.usersSerivece
          .deleteWorkout(payload.userId, payload.workoutId)
          .pipe(
            map((_data) =>
              fromAuthAction.DeleteWorkoutSuccess({ data: _data })
            ),
            catchError((error) =>
              of(fromAuthAction.DeleteWorkoutFailure({ error: error }))
            )
          )
      )
    )
  )

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.Refresh),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.authService.refresh(payload).pipe(
          map((_data) => fromAuthAction.RefreshSuccess({ data: _data })),
          tap(() => window.location.reload()),
          catchError((error) =>
            of(fromAuthAction.RefreshFailure({ error: error }))
          )
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.Logout),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.authService.logout(payload).pipe(
          tap(() => this.router.navigate(['/', 'login'])),
          map(() => fromAuthAction.LogoutSuccess()),
          catchError((error) =>
            of(fromAuthAction.LogoutFailure({ error: error }))
          )
        )
      )
    )
  )
}
