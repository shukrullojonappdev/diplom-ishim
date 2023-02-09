import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as fromIndexStore from 'src/app/store'
import * as fromAuthStore from 'src/app/store/auth'
import { RoleEnum } from '../enums/role.enum'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  user: any
  constructor(
    private router: Router,
    private store: Store<fromIndexStore.State>
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store
      .select(fromAuthStore.selectLoggedUser)
      .subscribe((_user) => (this.user = _user))

    if (
      this.user.roles.find((e: any) => e.value === RoleEnum.Admin) ||
      state.url === '/home' ||
      state.url === '/home/saved'
    ) {
      return true
    } else {
      this.router.navigate(['/', 'home'])
      return false
    }
  }
}
