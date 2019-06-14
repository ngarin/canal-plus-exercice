import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/app.store';
import { TitleState } from './title.reducer';

export const selectTitleState = createSelector(
  (state: AppState) => state.title,
  (state: TitleState) => state,
);
