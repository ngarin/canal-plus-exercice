import { Action } from '@ngrx/store';

export enum TitleActionTypes {
  Fetch = '[Title] Fetching...',
  FetchSuccess = '[Title] Fetch success',
  FetchError = '[Title] Fetch error!',
  Search = '[Title] Searching...',
  SearchAdd = '[Title] Add results',
  SearchSuccess = '[Title] Search success',
  SearchCancel = '[Title] Search cancelled',
  SearchError = '[Title] Search error!',
  Edit = '[Title] Edited',
}

export class TitleFetchAction implements Action {
  readonly type = TitleActionTypes.Fetch;
}

export class TitleFetchSuccessAction implements Action {
  readonly type = TitleActionTypes.FetchSuccess;
}

export class TitleFetchErrorAction implements Action {
  readonly type = TitleActionTypes.FetchError;
}

export class TitleSearchAction implements Action {
  readonly type = TitleActionTypes.Search;
  constructor(public payload: { query: string, year: string }) {}
}

export class TitleSearchAddAction implements Action {
  readonly type = TitleActionTypes.SearchAdd;
  constructor(public payload: { titles: any[] }) {}
}

export class TitleSearchSuccessAction implements Action {
  readonly type = TitleActionTypes.SearchSuccess;
}

export class TitleSearchCancelAction implements Action {
  readonly type = TitleActionTypes.SearchCancel;
}

export class TitleSearchErrorAction implements Action {
  readonly type = TitleActionTypes.SearchError;
}

export class TitleEditAction implements Action {
  readonly type = TitleActionTypes.Edit;
  constructor(
    public payload: { id: string, title: string, year: string, genre: string }
  ) {}
}
