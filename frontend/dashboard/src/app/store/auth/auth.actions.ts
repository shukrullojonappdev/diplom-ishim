import { createAction, props } from '@ngrx/store'

export const Login = createAction('[Auth] Login', props<{ payload: any }>())

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: any }>()
)

export const LoginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
)

export const Registration = createAction(
  '[Auth] Registration',
  props<{ payload: any }>()
)

export const RegistrationSuccess = createAction(
  '[Auth] Registration Success',
  props<{ data: any }>()
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
