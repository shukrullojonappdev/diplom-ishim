import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { catchError, map, mergeMap, Observable, switchMap } from 'rxjs'

import { Store } from '@ngrx/store'
import * as fromIndexStore from '../../store'
import * as fromAuthStore from '../../store/auth'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isLoggedIn: boolean
  tokens: any
  user: any

  constructor(private store: Store<fromIndexStore.State>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store
      .select(fromAuthStore.selectAuthStatus)
      .subscribe((_isLoggedIn) => (this.isLoggedIn = _isLoggedIn))
    this.store
      .select(fromAuthStore.selectAuthTokens)
      .subscribe((_tokens) => (this.tokens = _tokens))
    this.store
      .select(fromAuthStore.selectAuthTokens)
      .subscribe((_user) => (this.user = _user))

    if (this.isLoggedIn) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.tokens.accessToken}` },
      })

      if (request.url.includes('http://localhost:3000/api/refresh')) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${this.tokens.refreshToken}` },
        })
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.store.dispatch(
            fromAuthStore.Refresh({
              payload: { id: this.user.id, refTok: this.tokens.refreshToken },
            })
          )
          if (request.url.includes('http://localhost:3000/api/refresh')) {
            this.store.dispatch(fromAuthStore.Logout({ payload: this.user.id }))
          }
        }
        throw Error(error)
      })
    )
  }
}
