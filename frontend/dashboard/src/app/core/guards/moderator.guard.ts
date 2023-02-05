import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import * as fromAuthStore from '../../store/auth'
import * as fromIndexStore from '../../store'
import { Store } from '@ngrx/store'
import { RoleEnum } from '../enums/role.enum'

@Injectable({
  providedIn: 'root',
})
export class ModeratorGuard implements CanActivateChild {
  roles: any[]

  constructor(
    private store: Store<fromIndexStore.State>,
    private router: Router
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
      .subscribe((user) => (this.roles = user.roles))

    if (this.roles.find((role) => role === RoleEnum.Moderator)) {
      return true
    } else {
      this.router.navigate(['/', 'home'])
      return false
    }
  }
}
