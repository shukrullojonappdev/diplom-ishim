import { createReducer, on } from '@ngrx/store'
import * as fromAuthAction from './auth.actions'

export const authFeatureKey = 'auth'
const initializeState = JSON.parse(
  localStorage.getItem(authFeatureKey) as string
)

export interface State {
  isLoggedIn: boolean
  tokens: any
  user: any
}

export const initialState: State = initializeState
  ? {
      ...initializeState,
    }
  : {
      isLoggedIn: false,
      tokens: null,
      user: null,
    }

export const reducer = createReducer(
  initialState,
  on(fromAuthAction.LoginSuccess, (state, { data }) => {
    let newState = {
      ...state,
      isLoggedIn: true,
      tokens: data.tokens,
      user: data.user,
    }
    localStorage.setItem(authFeatureKey, JSON.stringify(newState))
    const currentState = JSON.parse(
      localStorage.getItem(authFeatureKey) as string
    )
    return {
      ...currentState,
    }
  }),
  on(fromAuthAction.RegistrationSuccess, (state, { data }) => {
    let newState = {
      ...state,
      isLoggedIn: true,
      tokens: data.tokens,
      user: data.user,
    }
    localStorage.setItem(authFeatureKey, JSON.stringify(newState))
    const currentState = JSON.parse(
      localStorage.getItem(authFeatureKey) as string
    )
    return {
      ...currentState,
    }
  }),
  on(fromAuthAction.LogoutSuccess, (state) => {
    localStorage.removeItem(authFeatureKey)
    return {
      ...state,
      isLoggedIn: false,
      tokens: null,
      user: null,
    }
  })
)
