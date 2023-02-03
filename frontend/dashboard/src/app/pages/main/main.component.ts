import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import * as fromIndexStore from '../../store'
import * as fromAuthStore from '../../store/auth'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    private router: Router,
    private store: Store<fromIndexStore.State>
  ) {}

  navigateTo(link: string) {
    return this.router.navigate(['/', link])
  }

  logout() {
    this.store.dispatch(fromAuthStore.Logout())
  }
}
