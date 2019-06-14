import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  public filtersForm: FormGroup;
  public years: string[];

  public _isSearchLoading = false;

  @Input() public set isSearchLoading(condition: boolean) {
    this._isSearchLoading = condition;

    if (condition) {
      this.filtersForm.disable();
    } else {
      this.filtersForm.enable();
    }
  }

  @Output() private search = new EventEmitter<any>();
  @Output() private cancelSearch = new EventEmitter<void>();

  constructor(formBuilder: FormBuilder) {
    this.filtersForm = formBuilder.group({
      query: [ '', Validators.required ],
      year: null,
    });

    this.years = [];
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      this.years.push(i.toString());
    }
  }

  public ngOnInit() {}

  public onSearch() {
    if (!this._isSearchLoading && this.filtersForm.status === 'VALID') {
      this.search.emit(this.filtersForm.value);
    } else if (this._isSearchLoading) {
      this.cancelSearch.emit();
    }
  }

}
