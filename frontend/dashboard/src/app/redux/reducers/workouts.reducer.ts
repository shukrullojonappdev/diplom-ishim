import { createReducer, on } from '@ngrx/store'
import * as workoutsActions from '../actions/workouts.action'
import Workout from 'src/app/interfaces/workout.interface'

const initialState: Workout[] = []

export const wokroutsReducer = createReducer(
  initialState,
  on(
    workoutsActions.getWorkoutsSuccess,
    (state, { workouts }) => (state = workouts)
  ),
  on(workoutsActions.createWorkoutSuccess, (state, { newWorkout }) => [
    ...state,
    newWorkout,
  ])
)
