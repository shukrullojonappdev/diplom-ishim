import { createAction, props } from '@ngrx/store'
import * as fromAuthInterface from './auth.interface'

export const Login = createAction(
  '[Auth] Login',
  props<{ payload: fromAuthInterface.Login }>()
)

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ tokens: any }>()
)

export const LoginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
)

export const Registration = createAction(
  '[Auth] Registration',
  props<{ payload: fromAuthInterface.Registration }>()
)

export const RegistrationSuccess = createAction(
  '[Auth] Registration Success',
  props<{ tokens: any }>()
)

export const RegistrationFailure = createAction(
  '[Auth] Registration Failure',
  props<{ error: any }>()
)

export const Logout = createAction('[Auth] Logout')

export const LogoutSuccess = createAction('[Auth] Logout Success')

export const LogoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
)
