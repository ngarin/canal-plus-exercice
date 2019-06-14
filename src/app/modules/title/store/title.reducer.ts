import { fromJS } from 'immutable';
import { TitleActionTypes } from './title.actions';

export const initialState: TitleState = {
  titles: [],
  isLoading: false,
  isErrored: false,
  isSearchLoading: false,
  isSearchErrored: false,
};

export function titleReducer(state = initialState, action) {
  const currentState = fromJS(state);

  switch (action.type) {
    case TitleActionTypes.Fetch:
      return currentState
        .set('isLoading', true)
        .set('isErrored', false)
        .toJS();
    case TitleActionTypes.FetchSuccess:
      return currentState
        .set('isLoading', false)
        .set('isErrored', false)
        .toJS();
    case TitleActionTypes.FetchError:
      return currentState
        .set('isLoading', false)
        .set('isErrored', true)
        .toJS();
    case TitleActionTypes.Search:
      return currentState
        .set('titles', [])
        .set('isSearchLoading', true)
        .set('isSearchErrored', false)
        .toJS();
    case TitleActionTypes.SearchAdd:
      return currentState
        .set('titles', [...state.titles, ...action.payload.titles ])
        .toJS();
    case TitleActionTypes.SearchSuccess:
      return currentState
        .set('isSearchLoading', false)
        .set('isSearchErrored', false)
        .toJS();
    case TitleActionTypes.SearchError:
      return currentState
        .set('isSearchLoading', false)
        .set('isSearchErrored', true)
        .toJS();
    case TitleActionTypes.Edit:
      const title = state.titles.find(t => t[0] === action.payload.id);
      title[2] = action.payload.title;
      title[5] = action.payload.year;
      title[1] = action.payload.genre;

      return state;
    default:
      return state;
  }
}

export interface TitleState {
  titles: any[];
  isLoading: boolean;
  isErrored: boolean;
  isSearchLoading: boolean;
  isSearchErrored: boolean;
}
