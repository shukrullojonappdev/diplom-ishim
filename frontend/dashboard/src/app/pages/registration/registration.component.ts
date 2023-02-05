import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import * as fromIndex from '../../store/index'
import * as fromAuthStore from '../../store/auth'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  hide1 = true
  hide2 = true

  constructor(
    private store: Store<fromIndex.State>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  registrationForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    rePassword: ['', Validators.required],
  })

  registration() {
    this.store.dispatch(
      fromAuthStore.Registration({
        payload: this.registrationForm.value,
      })
    )
  }

  navigate(link: string) {
    this.router.navigate(['', link])
  }
}
