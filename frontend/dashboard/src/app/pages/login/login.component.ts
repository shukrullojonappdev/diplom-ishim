import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import * as fromIndex from '../../store/index'
import * as fromAuthActions from '../../store/auth/auth.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private store: Store<fromIndex.State>) {}

  login() {
    this.store.dispatch(
      fromAuthActions.Login({
        payload: { email: 'string', password: 'strig' },
      })
    )
  }

  registration() {
    this.store.dispatch(fromAuthActions.RegistrationSuccess({ tokens: '' }))
  }
  logout() {
    this.store.dispatch(fromAuthActions.LogoutSuccess())
  }
}
