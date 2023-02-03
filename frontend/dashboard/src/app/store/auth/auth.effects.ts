import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap, catchError, of, tap } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import * as fromAuthAction from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.Login),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.authService.login(payload).pipe(
          map((_data) => fromAuthAction.LoginSuccess({ data: _data })),
          tap(() => this.router.navigate(['/', 'home'])),
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
          map((_data) => fromAuthAction.LoginSuccess({ data: _data })),
          tap(() => this.router.navigate(['/', 'home'])),
          catchError((error) =>
            of(fromAuthAction.RegistrationFailure({ error: error }))
          )
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.Logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => fromAuthAction.LogoutSuccess()),
          tap(() => this.router.navigate(['/', 'login'])),
          catchError((error) =>
            of(fromAuthAction.LogoutFailure({ error: error }))
          )
        )
      )
    )
  )
}
