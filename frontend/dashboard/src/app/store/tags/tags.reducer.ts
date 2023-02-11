import { Action, createReducer, on } from '@ngrx/store'
import * as fromTagsActions from './tags.actions'

export const tagsFeatureKey = 'tags'
const initializeState = JSON.parse(
  localStorage.getItem(tagsFeatureKey) as string
)

export interface State {
  allTags: any
  tags: any
}

export const initialState: State = initializeState
  ? {
      ...initializeState,
    }
  : {
      allTags: null,
      tags: null,
    }

export const reducer = createReducer(
  initialState,
  on(fromTagsActions.TagsSuccess, (state, { data }) => {
    let newState = {
      ...state,
      allTags: data,
      tags: null,
    }
    localStorage.setItem(tagsFeatureKey, JSON.stringify(newState))
    const currentState = JSON.parse(
      localStorage.getItem(tagsFeatureKey) as string
    )
    return {
      ...currentState,
    }
  })
)
