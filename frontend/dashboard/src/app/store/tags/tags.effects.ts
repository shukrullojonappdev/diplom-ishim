import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
import { TagsService } from 'src/app/core/services/tags.service'
import * as fromTagsActions from './tags.actions'

@Injectable()
export class TagsEffects {
  constructor(private actions$: Actions, private tagsService: TagsService) {}

  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTagsActions.Tags),
      mergeMap(() =>
        this.tagsService.getTags().pipe(
          map((_data) => fromTagsActions.TagsSuccess({ data: _data })),
          catchError((_error) =>
            of(fromTagsActions.TagsFailure({ error: _error }))
          )
        )
      )
    )
  )
}
