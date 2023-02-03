import { createReducer, on } from '@ngrx/store'
import User from 'src/app/interfaces/user.interface'
import * as fromAuthActions from './auth.actions'

export const authFeatureKey = 'auth'

export interface State {
  isLoggedIn: boolean
  tokens: any
}

export const initialState: State = {
  isLoggedIn: false,
  tokens: null,
}

export const reducer = createReducer(
  initialState,
  on(fromAuthActions.LoginSuccess, (state, { tokens }) => {
    return {
      ...state,
      isLoggedIn: true,
      tokens: {
        ...tokens,
      },
    }
  }),
  on(fromAuthActions.RegistrationSuccess, (state, { tokens }) => {
    return {
      ...state,
      isLoggedIn: true,
      tokens: {
        ...tokens,
      },
    }
  }),
  on(fromAuthActions.LogoutSuccess, (state) => {
    return {
      ...state,
      isLoggedIn: false,
    }
  })
)
