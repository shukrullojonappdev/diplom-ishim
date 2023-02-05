import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { Store } from '@ngrx/store'
import * as fromIndexStore from '../../store'
import * as fromAuthStore from '../../store/auth'
import { RoleEnum } from 'src/app/core/enums/role.enum'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user: any

  constructor(
    private router: Router,
    private store: Store<fromIndexStore.State>
  ) {
    store.select(fromAuthStore.selectLoggedUser)
  }

  ngOnInit(): void {
    this.store
      .select(fromAuthStore.selectLoggedUser)
      .subscribe((_user) => (this.user = _user))
  }

  navigateTo(link: string) {
    return this.router.navigate(['/', link])
  }

  setAdminView() {
    if (this.user.roles.find((e: any) => e.value === RoleEnum.Admin)) {
      return true
    }
    return false
  }

  logout() {
    this.store.dispatch(fromAuthStore.Logout())
  }
}
