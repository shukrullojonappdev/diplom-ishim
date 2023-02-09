import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, take } from 'rxjs'

import { Store } from '@ngrx/store'
import * as fromIndexStore from '../../store'
import * as fromAuthStore from '../../store/auth'
import { RoleEnum } from 'src/app/core/enums/role.enum'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user: any
  tokens: any

  constructor(
    private router: Router,
    private store: Store<fromIndexStore.State>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromAuthStore.selectLoggedUser)
      .subscribe((_user) => (this.user = _user))

    this.store
      .select(fromAuthStore.selectAuthTokens)
      .subscribe((_tokens) => (this.tokens = _tokens))
  }

  navigateTo(link: string) {
    return this.router.navigate([link])
  }

  setAdminView() {
    if (this.user.roles.find((e: any) => e.value === RoleEnum.Admin))
      return true
    return false
  }

  logout() {
    this.store.dispatch(fromAuthStore.Logout({ payload: { id: this.user.id } }))
  }
}
