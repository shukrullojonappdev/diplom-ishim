import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { catchError, Observable } from 'rxjs'

import { Store } from '@ngrx/store'
import * as fromIndexStore from '../../store'
import * as fromAuthStore from '../../store/auth'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isLoggedIn: boolean
  tokens: any

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

    if (this.isLoggedIn) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.tokens.accessToken}` },
      })
    }

    return next.handle(request)
  }
}
