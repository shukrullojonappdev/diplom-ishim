import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap, catchError, of } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import * as fromAuthActions from './auth.actions'
import * as fromAuthInterface from './auth.interface'

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.Login),
      map((action) => action.payload),
      mergeMap((payload: fromAuthInterface.Login) =>
        this.authService.login(payload).pipe(
          map((tokens) => fromAuthActions.LoginSuccess({ tokens: tokens })),
          catchError((error) =>
            of(fromAuthActions.LoginFailure({ error: error }))
          )
        )
      )
    )
  )

  registration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.Registration),
      map((action) => action.payload),
      mergeMap((payload: fromAuthInterface.Registration) =>
        this.authService.registration(payload).pipe(
          map((tokens) => fromAuthActions.LoginSuccess({ tokens: tokens })),
          catchError((error) =>
            of(fromAuthActions.RegistrationFailure({ error: error }))
          )
        )
      )
    )
  )
}
