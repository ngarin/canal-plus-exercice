import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  TitleActionTypes,
  TitleFetchSuccessAction,
  TitleFetchErrorAction,
  TitleSearchAction,
  TitleSearchSuccessAction,
  TitleSearchErrorAction,
  TitleSearchAddAction,
} from './title.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { TitleService } from 'src/app/core/http/title/title.service';

@Injectable()
export class TitleEffects {
  private subject$ = new Subject<boolean>();

  constructor(
    private actions$: Actions,
    private titleService: TitleService,
  ) {}

  @Effect()
  fetch$ = this.actions$.pipe(
    ofType(TitleActionTypes.Fetch),
    mergeMap(() => this.titleService.fetch()
      .pipe(
        map(() => new TitleFetchSuccessAction()),
        catchError(() => of(new TitleFetchErrorAction()))
      )
    )
  );

  @Effect()
  search$ = this.actions$.pipe(
    ofType(TitleActionTypes.Search),
    mergeMap((action: TitleSearchAction) =>
      this.titleService.search(action.payload.query, action.payload.year, this.subject$)
        .pipe(
          map(({ done, results }) => {
            if (done) {
              return new TitleSearchSuccessAction();
            }

            return new TitleSearchAddAction({ titles: results });
          }),
          catchError(() => of(new TitleSearchErrorAction()))
        )
    )
  );

  @Effect()
  cancelSearch$ = this.actions$.pipe(
    ofType(TitleActionTypes.SearchCancel),
    map(() => {
      this.subject$.next(false);
      return new TitleSearchSuccessAction();
    }),
  );
}
