import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import * as fromIndex from '../../store/index'
import * as fromAuthStore from '../../store/auth'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true
  mode = window.matchMedia('(prefers-color-scheme: light)').matches
  darkIcon =
    '../../../assets/hal-high-resolution-logo-white-on-transparent-background.webp'
  lightIcon =
    '../../../assets/hal-high-resolution-logo-black-on-transparent-background.webp'

  constructor(
    private store: Store<fromIndex.State>,
    private formBuilder: FormBuilder,
    private router: Router
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

  navigate(link: string) {
    this.router.navigate(['', link])
  }
}
