import { createAction, props } from '@ngrx/store'
import Workout from 'src/app/interfaces/workout.interface'

const GET_WORKOUTS = '[Workout] Get all'
const GET_WORKOUTS_SUCCESS = '[Workout] Get workouts success'
const GET_WORKOUTS_ERROR = '[Workout] Get workouts error'

const CREATE_WORKOUT = '[Workout] Created'
const CREATE_WORKOUT_SUCCESS = '[Workout] Created success'
const CREATE_WORKOUT_ERROR = '[Workout] Created error'

export const getWorkouts = createAction(GET_WORKOUTS)
export const getWorkoutsSuccess = createAction(
  GET_WORKOUTS_SUCCESS,
  props<{ workouts: Workout[] }>()
)
export const getWorkoutsError = createAction(GET_WORKOUTS_ERROR)

export const createWorkout = createAction(CREATE_WORKOUT)
export const createWorkoutSuccess = createAction(
  CREATE_WORKOUT_SUCCESS,
  props<{ newWorkout: Workout }>()
)
export const createWorkoutError = createAction(CREATE_WORKOUT_ERROR)
