import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'

import { Store } from '@ngrx/store'
import * as fromIndexStore from '../store'
import * as fromAuthStore from '../store/auth'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromIndexStore.State>) {}

  tokens: any

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store
      .select(fromAuthStore.selectAuthAccessToken)
      .subscribe((_tokens) => (this.tokens = _tokens))

    if (this.tokens) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.tokens.accessToken}` },
      })
    }

    return next.handle(request)
  }
}
