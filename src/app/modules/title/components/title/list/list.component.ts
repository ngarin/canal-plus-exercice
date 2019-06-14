import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { EditTitleComponent } from './edit-title/edit-title.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() public titles: any[];
  @Input() public isSearchLoading = false;

  public displayedColumns = [ 'originalTitle', 'startYear', 'genre', 'edit' ];

  @Output() private edit = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog,
  ) {}

  public ngOnInit() {}

  public onEdit(title) {
    const dialogRef = this.dialog.open(EditTitleComponent, {
      width: '250px',
      data: title,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.edit.emit(result);
      }
    });
  }

}
