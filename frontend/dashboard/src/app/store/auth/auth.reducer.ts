import { createReducer, on } from '@ngrx/store'
import User from 'src/app/interfaces/user.interface'
import * as fromAuthAction from './auth.actions'

export const authFeatureKey = 'auth'

export interface State {
  isLoggedIn: boolean
  tokens: any
  user: any
}

export const initialState: State = {
  isLoggedIn: false,
  tokens: null,
  user: null,
}

export const reducer = createReducer(
  initialState,
  on(fromAuthAction.LoginSuccess, (state, { data }) => {
    return {
      ...state,
      isLoggedIn: true,
      tokens: data.tokens,
      user: data.user,
    }
  }),
  on(fromAuthAction.RegistrationSuccess, (state, { data }) => {
    return {
      ...state,
      isLoggedIn: true,
      tokens: data.tokens,
      user: data.user,
    }
  }),
  on(fromAuthAction.LogoutSuccess, (state) => {
    return {
      ...state,
      isLoggedIn: false,
      tokens: null,
      user: null,
    }
  })
)
