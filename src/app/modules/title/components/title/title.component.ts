import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.store';
import { TitleFetchAction, TitleSearchAction, TitleEditAction, TitleSearchAddAction, TitleSearchCancelAction } from '../../store/title.actions';
import { selectTitleState } from '../../store/title.selectors';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnDestroy {

  public titles = [];
  public isLoading = false;
  public isSearchLoading = false;

  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {}

  public ngOnInit() {
    this.store.dispatch(new TitleFetchAction());

    // this.store.dispatch(new TitleSearchAddAction({ titles: [[ 'ts11293', null, 'Star Wars III', 'Movie', null, '1977' ]]}));

    this.subscription = this.store
      .pipe(select(selectTitleState))
      .subscribe((titleState) => {
        this.isLoading = titleState.isLoading;
        this.titles = titleState.titles;
        this.isSearchLoading = titleState.isSearchLoading;
      });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSearch(form) {
    this.store.dispatch(new TitleSearchAction(form));
  }

  public onEdit(form) {
    this.store.dispatch(new TitleEditAction(form));
  }

  public onCancelSearch() {
    this.store.dispatch(new TitleSearchCancelAction());
  }

}
