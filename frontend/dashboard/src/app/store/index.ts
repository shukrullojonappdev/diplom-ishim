import { isDevMode } from '@angular/core'
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store'

import * as authStore from './auth'

export interface State {
  [authStore.authFeatureKey]: authStore.State
}

export const reducers: ActionReducerMap<State> = {
  [authStore.authFeatureKey]: authStore.reducer,
}

export const metaReducers: MetaReducer<State>[] = []
