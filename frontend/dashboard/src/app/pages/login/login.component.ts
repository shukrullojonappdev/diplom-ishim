import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import * as fromIndex from '../../store/index'
import * as fromAuthStore from '../../store/auth'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private store: Store<fromIndex.State>,
    private formBuilder: FormBuilder
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  login() {
    this.store.dispatch(
      fromAuthStore.Login({
        payload: this.loginForm.value,
      })
    )
  }
}
