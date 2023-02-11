import { isDevMode } from '@angular/core'
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store'

import * as fromAuth from './auth'
import * as fromTags from './tags'

export interface State {
  [fromAuth.authFeatureKey]: fromAuth.State
  [fromTags.tagsFeatureKey]: fromTags.State
}

export const reducers: ActionReducerMap<State> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromTags.tagsFeatureKey]: fromTags.reducer,
}

export const metaReducers: MetaReducer<State>[] = []
