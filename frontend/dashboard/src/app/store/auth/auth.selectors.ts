import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAuthReducer from './auth.reducer'

export const selectAuth = createFeatureSelector<fromAuthReducer.State>(
  fromAuthReducer.authFeatureKey
)

export const selectAuthStatus = createSelector(
  selectAuth,
  (state) => state.isLoggedIn
)

export const selectAuthAccessToken = createSelector(
  selectAuth,
  (state) => state.tokens
)
