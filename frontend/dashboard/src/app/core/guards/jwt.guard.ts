import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import * as fromAuthStore from '../../store/auth'
import * as fromIndexStore from '../../store'
import { Store } from '@ngrx/store'

@Injectable({
  providedIn: 'root',
})
export class JwtGuard implements CanActivate {
  isLoggedIn: boolean

  constructor(
    private store: Store<fromIndexStore.State>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store
      .select(fromAuthStore.selectAuthStatus)
      .subscribe((_isLoggedIn) => (this.isLoggedIn = _isLoggedIn))

    if (this.isLoggedIn) {
      return true
    } else {
      this.router.navigate(['/', 'login'])
      return false
    }
  }
}
