import { createAction, props } from '@ngrx/store'

export const Tags = createAction('[Tags] Load Tags')

export const TagsSuccess = createAction(
  '[Tags] Load Tags Success',
  props<{ data: any }>()
)

export const TagsFailure = createAction(
  '[Tags] Load Tags Failure',
  props<{ error: any }>()
)
