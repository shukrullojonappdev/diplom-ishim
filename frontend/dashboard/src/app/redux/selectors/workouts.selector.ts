import { createFeatureSelector, createSelector } from '@ngrx/store'
import Workout from 'src/app/interfaces/workout.interface'

export const workoutsKey = 'workouts'

export const featureSelectorWorkouts =
  createFeatureSelector<Workout[]>(workoutsKey)

export const selectorWokrouts = createSelector(
  featureSelectorWorkouts,
  (state) => state
)
